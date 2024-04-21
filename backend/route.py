from flask import Flask, request
from flask_cors import CORS
import multiprocessing
import timeout_decorator
import tensorflow as tf
from io import StringIO
import random
import numpy as np
from openai import OpenAI
import json
from dotenv import load_dotenv
import os
from contextlib import redirect_stdout

# Load the environment variables from the .env file
load_dotenv()

app = Flask(__name__)

CORS(app)

def execute_code(code):
    try:
        f = StringIO()
        with redirect_stdout(f):
            exec(code, {"__name__": "__main__"})
        return f.getvalue()
    except Exception as e:
        return str(e)

def check_python_code(code):
    global output
    try:
        # Check if the code compiles
        compile(code, '<string>', 'exec')
    except SyntaxError as e:
        print("Syntax Error")
        print(str(e))
        return {"Status":"SyntaxError", "Message":str(e)}

    # Set a timeout and execute the code
    try:
        process = multiprocessing.Process(target=execute_code, args=(code,))
        process.start()
        process.join(timeout=5)  # Adjust timeout as necessary
        if process.is_alive():
            process.terminate()
            process.join()
            return {"Status": "Infinite", "Message": "Compile Timeout Error, please check for infinite loops"}
    except timeout_decorator.timeout_decorator.TimeoutError:
        return {"Status": "Infinite", "Message": "Compile Timeout Error, please check for infinite loops"}
    except Exception as e:
        return {"Status":"SyntaxError", "Message":e}
    return {"Status":"Success","Message" : execute_code(code)}


@app.route("/run", methods=["POST"])
def run():
    content = f"""{request.get_json()["code"]}"""
    print(content)
    res = check_python_code(content)
    print(f"Res")
    print(res)
    return res

@app.route("/llm_api", methods=["POST"])
def llm_api():
    content = f"""Ok, so here is the question: {request.get_json()["question"]} and here is the answer: {request.get_json()["answer"]}. Given this context, please check if this answer is correct based on the question. If it is not, please provide the correct answer. You have to give the output in the format <Correct/Incorrect> <Correct Answer/Positive Feedback>. For example in: question: print hello world statement, answer: print("hello world"), the output should be: Correct Good Job!. If the answer is incorrect, the output should be: Incorrect The correct answer is print("hello world")."""
    # print("API Ky", os.getenv('OPENAI_API'))
    client = OpenAI(api_key=os.getenv('OPENAI_API'))
    response = client.chat.completions.create(model="ft:gpt-3.5-turbo-0125:personal::9GCHGPWm", messages=[{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": content}])
    msg = response.choices[0].message.content
    return {"response": msg.split(" ")[0], "feedback": " ".join(msg.split(" ")[1:])}
    
    @app.route("/llm_chatbot", methods=["POST"])
def llm_chatbot_msg():
    client = OpenAI(api_key=os.getenv('OPENAI_API'))
    print(request.get_json())
    response = client.chat.completions.create(model="ft:gpt-3.5-turbo-0125:personal::9GCHGPWm", messages=request.get_json())
    msg = response.choices[0].message.content
    return {"feedback": msg}

@app.route("/get_completion_list", methods=["GET"])
def get_completion_list():
    # if completion_list.json is empty populate it
    if os.path.getsize("completion_list.json") == 0:
        with open("completion_list.json", "w") as file:
            file.write(json.dumps({"completion_list": [0]*28, "cur_q": 0}))
    # Read from completion_list.json
    with open("completion_list.json", "r") as file:
        completion_list = json.loads(file.read())
    return completion_list

@app.route("/write_completion_list", methods=["POST"])
def write_completion_list():
    # Write to completion_list.json
    with open("completion_list.json", "w") as file:
        file.write(json.dumps(request.get_json()))
    return {"Status": "Success"}




@app.route("/recommend_question", methods=['POST'])
def recommend():
    content = request.get_json()["data"]
    loaded = tf.keras.models.load_model("model.keras")
    prediction = loaded.predict(np.array([content]))[0]
    questions = [i for i in range(1, 22)]
    choice = random.choices(questions, prediction, k=1)
    return choice

if __name__ == "__main__":
    app.run(port=3002, debug=True)
