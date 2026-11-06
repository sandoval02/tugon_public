"""
Runner script for TUGON AI Decision Support Microservice
"""
import uvicorn

if __name__ == "__main__":
    print("=" * 60)
    print("Starting TUGON AI Microservice (Port 8001)")
    print("Documentation: http://127.0.0.1:8001/docs")
    print("=" * 60)
    uvicorn.run("app.main:app", host="0.0.0.0", port=8001, reload=True)

