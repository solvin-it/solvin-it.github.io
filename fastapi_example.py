#!/usr/bin/env python3
"""
FastAPI Chat Service Example
Compatible with the portfolio chat widget

To run this service:
1. Install dependencies: pip install fastapi uvicorn
2. Run the server: python fastapi_example.py
3. The service will be available at http://127.0.0.1:8000

Expected request format:
{
  "messages": [
    {
      "role": "human", 
      "content": "Who is Jose Fernando Gonzales?"
    }
  ],
  "thread_id": "thread-1"
}

Expected response format:
{
  "output": {
    "messages": "Jose Fernando A. Gonzales is a Technical Solutions Engineer..."
  },
  "checkpoint_id": "1f09b57f-6ec1-6a54-8034-40c7b3f5fef0",
  "num_messages": 41
}
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI(title="Jose's Portfolio Chat API", version="1.0.0")

# Enable CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4321", "http://127.0.0.1:4321", "*"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Request/Response Models
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    thread_id: str

class ChatOutput(BaseModel):
    messages: str

class ChatResponse(BaseModel):
    output: ChatOutput
    checkpoint_id: str
    num_messages: int

# Mock knowledge base about Jose
JOSE_INFO = {
    "basic_info": "Jose Fernando A. Gonzales is a Technical Solutions Engineer based in Makati City, Philippines.",
    "experience": "He previously served as a Senior Technical Business Analyst at DigitalPH Asia Corporation (Dec 2020–Dec 2024), leading 10+ projects including the Nepal AFCS Implementation and Boracay HOHO AFCS.",
    "education": "He holds Magna Cum Laude BS in Information Technology from the University of Asia and the Pacific and is pursuing a Postgraduate Diploma in Artificial Intelligence and Machine Learning (Emeritus x AIM).",
    "skills": "Jose has expertise in Python, React, TypeScript, Machine Learning, FastAPI, and technical solutions engineering.",
    "projects": "He has worked on projects including customer churn prediction models, RAG systems, and automated fare collection systems.",
}

def generate_response(message_content: str) -> str:
    """
    Simple keyword-based response generation.
    Replace this with your actual AI/ML model integration.
    """
    content_lower = message_content.lower()
    
    if any(word in content_lower for word in ["who", "about", "introduce"]):
        return f"{JOSE_INFO['basic_info']} {JOSE_INFO['experience']} {JOSE_INFO['education']}"
    
    elif any(word in content_lower for word in ["experience", "work", "job"]):
        return JOSE_INFO['experience']
    
    elif any(word in content_lower for word in ["education", "degree", "school"]):
        return JOSE_INFO['education']
    
    elif any(word in content_lower for word in ["skills", "technology", "programming"]):
        return JOSE_INFO['skills']
    
    elif any(word in content_lower for word in ["projects", "built", "developed"]):
        return JOSE_INFO['projects']
    
    elif "hello" in content_lower or "hi" in content_lower:
        return "Hello! I'm Jose's AI assistant. I can help you learn about his background, experience, skills, and projects. What would you like to know?"
    
    else:
        return f"I can help you learn about Jose's background, experience, skills, and projects. {JOSE_INFO['basic_info']}"

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Main chat endpoint that matches your expected API format
    """
    try:
        if not request.messages or len(request.messages) == 0:
            raise HTTPException(status_code=400, detail="No messages provided")
        
        # Get the last user message
        last_message = request.messages[-1]
        if last_message.role != "human":
            raise HTTPException(status_code=400, detail="Expected human message")
        
        # Generate response (replace with your AI model)
        response_text = generate_response(last_message.content)
        
        # Return in the expected format
        return ChatResponse(
            output=ChatOutput(messages=response_text),
            checkpoint_id=str(uuid.uuid4()),
            num_messages=len(request.messages) + 1
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Jose's Portfolio Chat API is running!"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "chat-api"}

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Jose's Portfolio Chat API...")
    print("📡 Chat endpoint: http://127.0.0.1:8000/chat")
    print("🔗 Frontend should connect to: http://127.0.0.1:8000")
    print("📋 API docs: http://127.0.0.1:8000/docs")
    
    uvicorn.run(
        "fastapi_example:app",
        host="127.0.0.1",
        port=8000,
        reload=True,  # Auto-reload on code changes
        log_level="info"
    )