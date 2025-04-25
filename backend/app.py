from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from detector import analyze_text, clean_text

app = FastAPI(title="WatermarkHunter API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

class TextRequest(BaseModel):
    content: str

class WatermarkLocation(BaseModel):
    character: str
    unicode_name: str
    position: int
    
class AnalysisResponse(BaseModel):
    watermarks: List[WatermarkLocation]
    statistics: Dict[str, int]

@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze(request: TextRequest):
    try:
        if not request.content:
            raise ValueError("Empty text provided")
            
        result = analyze_text(request.content)
        
        # Convert the result to match the response model
        formatted_result = {
            "watermarks": [
                {
                    "character": w["character"],
                    "unicode_name": w["unicode_name"],
                    "position": w["position"]
                }
                for w in result["watermarks"]
            ],
            "statistics": result["statistics"]
        }
        
        return formatted_result
    except Exception as e:
        print(f"Analysis error: {str(e)}")  # Server-side logging
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/clean", response_model=TextRequest)
async def clean(request: TextRequest):
    try:
        if not request.content:
            raise ValueError("Empty text provided")
            
        cleaned_text = clean_text(request.content)
        return TextRequest(content=cleaned_text)
    except Exception as e:
        print(f"Cleaning error: {str(e)}")  # Server-side logging
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"} 