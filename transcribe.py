import whisper
import sys
import warnings

warnings.filterwarnings("ignore")  # hide warnings
model = whisper.load_model("base")  # loads once per process

def main():
    result = model.transcribe(sys.argv[1])
    print(result["text"].strip())

if __name__ == "__main__":
    main()

