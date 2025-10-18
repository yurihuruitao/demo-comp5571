# AI Health Assistant for Elders

An AI-powered health consultation and chat application with text-to-speech capabilities.

## Features

- 🏥 **Health Consultation**: Get AI-powered health advice for elderly users
- 💬 **Friendly Chat**: Have casual conversations with an AI companion
- 🔊 **Text-to-Speech**: All AI responses are read aloud using Alibaba's speech synthesis
- 🎨 **User-Friendly Interface**: Clean, accessible design with 3D character interactions

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the application:
```bash
python app.py
```

3. Open your browser and navigate to:
```
http://127.0.0.1:5000
```

## Dependencies

- Flask: Web framework
- OpenAI: For Qwen Max API (text generation)
- DashScope: For Alibaba's speech synthesis (TTS)

## Usage

1. Click on the **Doctor** character for health consultations
2. Click on the **Friend** character for casual chat
3. Type your message and press Send or Enter
4. AI responses will appear as text and play as audio automatically
5. Click the 🔊 button to replay any audio message

## API Keys

The application uses Alibaba's DashScope API. Make sure your API key is configured in `app.py`.

## Audio Files

Generated audio files are stored in `static/audio/` directory.
