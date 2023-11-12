# from gpt_index import SimpleDirectoryReader, GPTListIndex,readers, GPTSimpleVectorIndex, LLMPredictor, PromptHelper
import asyncio 
from types import FunctionType
from llama_index import ServiceContext, GPTVectorStoreIndex, LLMPredictor, PromptHelper, SimpleDirectoryReader, load_index_from_storage
import sys
import os
import time 
# from llama_index.response.schema import StreamingResponse
from fastapi.responses import StreamingResponse
import uvicorn 
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn 
from create_agent import create_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    input_text: str


agent = create_agent()

async def astreamer(generator):
    try:
        for i in generator:
            yield (i)
            await asyncio.sleep(.1)
    except asyncio.CancelledError as e:
        print('cancelled')

@app.post("/question_answering")
async def create_item(item: Item):
    input_sentence = item.input_text
    print("INPUT: ", input_sentence)
    
    response = agent.chat(input_sentence)  
    return StreamingResponse(astreamer(response.response), media_type="text/event-stream")

@app.get("/")
@app.get("/health_check")
async def health_check():
    return "ok"
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)