'''
Flask Server for PaperDisk
Date: 10th June 2024
-
Dwijottam Dutta

'''

import random
from dotenv import load_dotenv, find_dotenv
import os
from string import octdigits
from datetime import datetime
from flask import Flask, render_template, request, session, redirect, url_for, abort
from pymongo import MongoClient

# Flask Configurations
app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["SECRET_KEY"] = "123456"

# LOADING PASSWORD FOR ACCESSING MONGO DB
load_dotenv(find_dotenv())
password = os.environ.get("MONGODB_PASSWORD")


MONGO_URI = f"mongodb+srv://dj_dwazz:{password}@cluster0.mi3ncby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)

dbs = client.list_database_names()
paper_db = client.paper

collection = paper_db.data


# GENERATE [NEW-UNIQUE-SECURE] PAPER ID
def GENERATE_UNIQUE_ID(length):
    
    codes = collection.distinct('_code')
    
    while True:
        code = ""
        for _ in range(length):
            code += random.choice(octdigits)

        if code not in codes:
            break

    return code


@app.route('/', methods=['GET', 'POST'])
def home():
    session.clear()
    if request.method == "POST":
        text = request.form.get('paper')
        passd = request.form.get('password')
        new_code = GENERATE_UNIQUE_ID(4)
        
        # STRINGIFY DATE AND TIME [So, that nothing goes wrong] :)
        now = datetime.now()
        now.strftime("%Y")
        now.strftime("%m")
        now.strftime("%d")
        date_time = now.strftime("%d/%m/%Y")
        
        payload = {
            "_code": new_code,
            "paper": text,
            "password": passd,
            "date": date_time,
            "updated": 0
        }
        
        collection.insert_one(payload)
        
        return redirect(url_for("paper_details", code=new_code))
            
    # WELCOMING THE CUSTOMER :)
    return render_template("home.html")


@app.route('/paper/<code>', methods=['GET', 'POST'])
def paper_details(code):
    
    if request.method == "POST":
        paper_passd = request.form.get('password')

        paper_data = collection.find_one({"_code": code})
            
        # IF PASSWORD IS CORRECT
        if paper_passd == paper_data["password"]:
            
            # LOGGED IN FOR THAT SPECIFIC CODE
            session['paper_code_verified_for_access'] = code
            
            return redirect(url_for("paper_details", code=code))
        
        else:
            return render_template(
                "login-to-paper.html", error="Wrong Password.", code=code
            )
        
    
    elif request.method == "GET":
        codes = collection.distinct('_code')
        
        if code in codes:
            
            if session.get("paper_code_verified_for_access") == code:
                
                paper_data = collection.find_one({"_code": code})
                
                return render_template("paper.html", content=paper_data["paper"], date=paper_data["date"], code=code)
                
            return render_template("login-to-paper.html", code=code)
        
        else:
            return f"<h2>Paper not found !!</h2>Paper with <i>'{code}'</i> doesn't exist or is removed from PaperDisk Server"
        
        
        
        
@app.route('/paper/<code>/update', methods=['POST'])
def paper_update(code):
    if request.method == "POST":
        
        codes = collection.distinct('_code')
        if code in codes:
            
            if session.get("paper_code_verified_for_access") == code:
                text = request.form.get('paper')
                

                payload = {
                    "$set": {"paper": text},
                    "$inc": {"updated": 1}
                }
                
                collection.update_one({"_code":code},payload)
                
                return redirect(url_for("paper_details", code=code))
                
            else:
                return "Suspicious Paper Updating Attempt. Try attempting once more !!"
                
        else:
            abort(404)
        


app.run(host='0.0.0.0', port=8080)