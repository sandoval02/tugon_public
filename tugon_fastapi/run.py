"""
Runner script for TUGON FastAPI Core API
"""
import uvicorn

if __name__ == "__main__":
    print("=" * 60)
    print("Starting TUGON Core Backend API (Academic Demonstration Mode)")
    print("Municipality: Liliw, Laguna")
    print("Documentation: http://127.0.0.1:8000/docs")
    print("=" * 60)
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

