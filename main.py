"""
    Flask Server for PaperDisk
    Date: 10th June 2024
    -
    Dwijottam Dutta

"""

import random
from string import octdigits
from datetime import datetime
from flask import Flask, render_template, request, session, redirect, url_for, abort
from db import *

# Flask Configurations
app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["SECRET_KEY"] = "123456"



# GENERATE [NEW-UNIQUE-SECURE] PAPER ID
def GENERATE_UNIQUE_CODE(length):
    codes = collection.distinct("_code")

    while True:
        code = ""
        for _ in range(length):
            code += random.choice(octdigits)

        if code not in codes:
            break

    return code


@app.route("/", methods=["GET", "POST"])
def home():
    # session.clear()
    if request.method == "POST":
        passd = request.form.get("password")
        owner = request.form.get("owner")
        new_code = GENERATE_UNIQUE_CODE(4)

        # STRINGIFY DATE AND TIME [So, that nothing goes wrong] :)
        now = datetime.now()
        now.strftime("%Y")
        now.strftime("%m")
        now.strftime("%d")
        date_time = now.strftime("%d/%m/%Y")

        payload = {
            "_code": new_code,
            "data": ["// Your Disk has been created successfully!!\n// All yours!!"],
            "password": passd,
            "date": date_time,
            "updated": 0,
            "owner": owner
        }

        collection.insert_one(payload)

        session["paper_code_verified_for_access"] = new_code

        return redirect(url_for("paper_details", code=new_code, buffer=0))

    # WELCOMING THE CUSTOMER :)
    logged = session.get("paper_code_verified_for_access")
    
    if logged:
        return redirect(url_for("paper_details", code=logged, buffer=0))
    
    return render_template("home.html.jinja")


@app.route("/id=<code>&paper=<buffer>", methods=["GET", "POST"])
def paper_details(code, buffer):
    
    try:
        buffer = int(buffer)
        
        if request.method == "POST":
            paper_password = request.form.get("password")

            paper_data = collection.find_one({"_code": code})

            # IF PASSWORD IS CORRECT
            if paper_password == paper_data["password"]:

                # LOGGED IN FOR THAT SPECIFIC CODE
                session["paper_code_verified_for_access"] = code

                return redirect(url_for("paper_details", code=code, buffer=buffer))

            else:
                return render_template(
                    "login.html.jinja", error="Wrong Password.", code=code
                )

        elif request.method == "GET":
            codes = collection.distinct("_code")

            if code in codes:

                if session.get("paper_code_verified_for_access") == code:
                    paper_data = collection.find_one({"_code": code})
                    count = len(paper_data["data"])

                    if count == 0:
                        return "<h2>Something went wrong!!</h2><label>It looks like your disk has been <b>corrupted</b>!!</label><p>This may be due to explicit request to the server. Please do contact the developer.</p>"
                    
                    try:
                        # TRY GETTING INFO FOR THE ONES WHICH ARE CREATED AFTER UPDATE
                        return render_template(
                            "paper.html.jinja",
                            content=paper_data["data"][buffer],
                            date=paper_data["date"],
                            code=code,
                            buffer=buffer,
                            updated=paper_data["updated"],
                            recid=paper_data["_id"],
                            owner=paper_data["owner"],
                            count=count,
                            alert="Always remember your Disk ID and Password",
                        )
                    except Exception:
                        # GET INFO OF OLD DISKS
                        return render_template(
                                "paper.html.jinja",
                                content=paper_data["data"][buffer],
                                date=paper_data["date"],
                                code=code,
                                buffer=buffer,
                                updated=paper_data["updated"],
                                recid=paper_data["_id"],
                                owner="N/A",
                                count=count,
                                alert="Always remember your Disk ID and Password",
                            )
                        
                        

                return render_template("login.html.jinja", code=code)

            else:
                return (
                    f"<h2>Paper not found !!</h2>Paper with <i>'{code}'</i> doesn't exist or is removed from PaperDisk "
                    f"Server"
                )

        
    except Exception:
        abort(404)

@app.route("/id=<code>&paper=<buffer>/update", methods=["POST"])
def paper_update(code, buffer):
    
    try:
        buffer = int(buffer)
        if request.method == "POST":

            codes = collection.distinct("_code")
            if code in codes:

                if session.get("paper_code_verified_for_access") == code:
                    text = request.form.get("paper")

                    payload = {"$set": {"data."+str(buffer): text}, "$inc": {"updated": 1}}

                    collection.update_one({"_code": code}, payload)

                    return redirect(url_for("paper_details", code=code, buffer=buffer))

                else:
                    return "Suspicious Paper Updating Attempt. Try attempting once more !!"

            else:
                abort(404)
                
    except ValueError:
        abort(404)


@app.route("/id=<code>&paper=<buffer>/add", methods=["POST"])
def paper_add(code, buffer):
    
    try:
        buffer = int(buffer)
        
        if request.method == "POST":

            codes = collection.distinct("_code")
            if code in codes:

                if session.get("paper_code_verified_for_access") == code:


                    now = datetime.now()
                    now.strftime("%H")
                    now.strftime("%M")
                    now.strftime("%S")
                    timestamp = now.strftime("%H:%M:%S")
                    
                    payload = {"$addToSet": {"data": "// Created at "+timestamp}}

                    collection.update_one({"_code": code}, payload)

                    print("ADDED")
                    return "success"

                else:
                    return "Suspicious Paper Adding Attempt. Try attempting once more !!"

            else:
                abort(404)
        
        
    except ValueError:
        abort(404)
        
        
@app.route("/id=<code>&paper=<buffer>/delete", methods=["POST"])
def paper_delete(code, buffer):
    
    try:
        buffer = int(buffer)
        
        if request.method == "POST":

            codes = collection.distinct("_code")
            if code in codes:

                if session.get("paper_code_verified_for_access") == code:

                    payload = {"$unset": {"data."+str(buffer): ""}}
                    collection.update_one({"_code": code}, payload)
                    
                    payload2 = {"$pull": { "data": { "$in": [None] }}}
                    collection.update_one({"_code": code}, payload2) 
                    
                    return "success"

                else:
                    return "Suspicious Paper Deletion Attempt. Try attempting once more !!"

            else:
                abort(404)
        
        
    except ValueError:
        abort(404)

@app.route("/recover-paper")
def paper_recovery():
    return "<h2>Under construction !!</h2> <label>This feature is under development and will not be released soon, because of some database issues and lack of idea for this feature..</label><p>But still if it is an emergency, you may write an email at <i>'dwijottamdutta@gmail.com'</i></p><b>But still!!</b><p>There is no gaurentee you would 100% get you paper recovered because of privacy/security issues</p><h3>So better remembers the pin and password of paper, whenever you create one !!</h3>"

@app.route("/logout")
def paper_logout():
    session.clear()
    return redirect("/")

@app.route("/premium")
def premium():
    return "<h2>Donate Us:</h2> <label>For keeping PaperDisk, 24/7 uptime running, and for lifetime we need your support!!<br>For maintanance of our database and server, we need money, to not get run out of storage.</label><p>If you like this project by me, please don't forget to donate some money on UPI: <b><i>9137745935@fam</i></b></p><b>It would be a great help for me as a single developer to handle all of the work!!</b><h3>Thank you !!</h3>"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
