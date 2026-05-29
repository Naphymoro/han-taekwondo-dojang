from fastapi import FastAPI

app = FastAPI(title='Han Taekwondo Korea API')

@app.get('/')
def root():
    return {'status':'online','service':'Han Taekwondo Korea API'}

@app.get('/students')
def students():
    return [{'id':1,'name':'Minho Park','belt':'Yellow Belt'}]

@app.get('/instructors')
def instructors():
    return [{'id':1,'name':'Master Kim'}]
