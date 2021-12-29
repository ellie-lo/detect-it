from os import name, system
from flask import Flask,render_template,jsonify,url_for
import os

app=Flask(__name__,static_url_path="/", static_folder='static') #__name__ 代表目前執行的模組

@app.route("/") # 函式的裝飾 (Decorator): 以函式為基礎，提供附加的功能
def home():
    return render_template("home.html")

@app.route("/index") #代表我們要處理的網站路徑
def index():
    return render_template("index.html")

@app.route("/oneshot") #代表我們要處理的網站路徑
def oneshot():
    return render_template("oneshot.html")

@app.route("/detail") #代表我們要處理的網站路徑
def detail():
    return render_template("detail.html")


# @app.route("/data") #代表我們要處理的網站路徑
# def data():
#     return jsonify(
#         name="python",
#     )

# @app.route("/data3")
# def data3():
#     val1= os.system('python3 /home/lokony82/yolov5/detect.py --weights /home/lokony82/yolov5/best0723-640.pt --conf 0.5 --source /home/lokony82/yolov5/data/images/ --save-crop')
#     return jsonify(
#         val1=val1,
#     )
if __name__=="__main__": # 如果以主程式執行
    app.run() # 立刻啟動伺服器

    