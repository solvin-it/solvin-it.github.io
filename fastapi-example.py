# Example FastAPI server for the chat widget
# Run with: uvicorn fastapi-example:app --host 127.0.0.1 --port 8000 --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai  # Optional: if using OpenAI
import os

app = FastAPI(title="Chat Widget API")

# Enable CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4321", "http://127.0.0.1:4321", "https://solvin-it.github.io"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str  # This matches what your widget expects

@app.post("/chat")
async def chat(request: ChatRequest) -> ChatResponse:
    """
    Handle chat messages from the widget.
    The widget sends: {"message": "user's question"}
    Expected response: {"response": "AI assistant reply"}
    """
    user_message = request.message
    
    # Example 1: Simple hardcoded responses based on keywords
    if any(keyword in user_message.lower() for keyword in ["experience", "work", "job"]):
        ai_response = """I have extensive experience as a Technical Solutions Engineer transitioning into AI/ML. 
        I've worked on customer-facing technical solutions, built production ML models, and have hands-on experience 
        with Python, React, and cloud technologies. I specialize in solving complex technical problems and 
        translating business requirements into scalable solutions."""
        
    elif any(keyword in user_message.lower() for keyword in ["projects", "portfolio", "built"]):
        ai_response = """Jose has worked on several impactful projects including:
        - Customer churn prediction models with 85%+ accuracy
        - CV/Resume parsing and analysis systems using RAG
        - Real-time data processing pipelines
        - Full-stack applications with React and Node.js
        - Point-of-sale systems and inventory management
        
        All projects focus on end-to-end delivery from problem understanding to production deployment."""
        
    elif any(keyword in user_message.lower() for keyword in ["skills", "technology", "tech"]):
        ai_response = """Jose's technical skills include:
        
        **AI/ML**: Python, scikit-learn, pandas, numpy, OpenAI API, RAG systems, model deployment
        **Backend**: FastAPI, Node.js, PostgreSQL, Redis, REST APIs
        **Frontend**: React, TypeScript, Tailwind CSS, Astro
        **Cloud**: AWS, Docker, CI/CD pipelines
        **Tools**: Git, Jupyter, VS Code, Linux
        
        He combines technical depth with business acumen from his solutions engineering background."""
        
    elif any(keyword in user_message.lower() for keyword in ["contact", "hire", "available"]):
        ai_response = """Jose is actively seeking AI/ML engineering opportunities! 
        
        You can reach him at:
        📧 Email: [his email from resume]
        💼 LinkedIn: [his linkedin]
        🐙 GitHub: github.com/solvin-it
        
        He's particularly interested in roles involving machine learning, data science, and building AI-powered products."""
        
    else:
        # Generic response for unrecognized queries
        ai_response = f"""Thank you for your question about "{user_message}". 
        
        I'm Jose's AI assistant and I can help you learn about:
        - His professional experience and career transition to AI/ML
        - Technical projects and portfolio highlights  
        - Skills in Python, ML, React, and full-stack development
        - How to get in touch for opportunities
        
        What would you like to know more about?"""
    
    return ChatResponse(response=ai_response)

# Example 2: If you want to integrate with OpenAI (optional)
"""
@app.post("/chat")
async def chat_with_openai(request: ChatRequest) -> ChatResponse:
    # Set your OpenAI API key
    openai.api_key = os.getenv("OPENAI_API_KEY")
    
    # Create a system prompt about Jose
    system_prompt = '''You are Jose's AI assistant helping visitors learn about his professional background. 

    Key information about Jose:
    - Technical Solutions Engineer transitioning to AI/ML
    - Experience with Python, React, Node.js, cloud technologies
    - Built production ML models, customer churn prediction, CV parsing systems
    - Strong in problem-solving and translating business needs to technical solutions
    - Actively seeking AI/ML engineering roles
    
    Be helpful, professional, and encourage visitors to reach out if they have opportunities.
    Keep responses concise but informative.'''
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ],
            max_tokens=300,
            temperature=0.7
        )
        
        ai_response = response.choices[0].message.content
        return ChatResponse(response=ai_response)
        
    except Exception as e:
        # Fallback response
        return ChatResponse(response="I'm having trouble processing your request right now. Please try again or contact Jose directly for more information.")
"""

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)