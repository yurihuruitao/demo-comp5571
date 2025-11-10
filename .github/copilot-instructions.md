# AI Health Assistant for Elders - Copilot Instructions

## Project Overview
Flask-based web application providing AI-powered health suggestions for elderly users in Chinese. Uses Alibaba's Qwen Max API (通义千问) through OpenAI-compatible endpoints for generating health advice based on symptom descriptions.

## Architecture

### Core Components
- **Backend**: `app.py` - Single Flask application with two routes
  - `/` - Renders main page
  - `/get_suggestion` (POST) - Processes health queries and calls Qwen API
- **Frontend**: Single-page application with modal-based interaction
  - `templates/index.html` - Main interface with AICSE branding
  - `static/script.js` - Modal handling and async API calls
  - `static/style.css` - Cyberpunk/tech-themed dark UI (DeepSkyBlue accent: #00bfff)

### Data Flow
1. User clicks glowing button → modal opens with textarea
2. User enters symptoms → JavaScript posts to `/get_suggestion`
3. Flask calls `call_qwen_max_api()` → Qwen Max generates advice
4. Response displayed in right panel of split modal view

## API Integration (Critical)

**Qwen Max API Configuration**:
```python
# Hardcoded in app.py
base_url = "https://dashscope.aliyuncs.com/compatible-mode/v1"
model = "qwen-max"
```

**System Prompt Convention**: AI acts as a compassionate elderly health consultant. Always includes mandatory disclaimer: "重要提示:以上建议仅供参考,不能替代专业医疗诊断。如果身体持续不适,请务必咨询医生。"

## Development Workflows

### Running the Application
```bash
# Development mode (debug=True is set in __main__)
python app.py
# Server starts on http://127.0.0.1:5000
```

### Testing API Calls
Check terminal output for:
- `接收到前端内容: '{text}',正在调用API...` (request received)
- `API调用成功!` (success) or `API调用失败: {error}` (failure)

## Project-Specific Conventions

### UI/UX Patterns
- **Color scheme**: Dark theme with glowing cyan (#00bfff) accents
- **Fonts**: Orbitron (logo), Roboto (body text)
- **Error states**: Button shows "生成中..." when loading, disables during API calls
- **Bilingual interface**: English headings, Chinese content/placeholders

### Code Style
- **Chinese comments**: All docstrings and inline comments are in Chinese
- **Error handling**: Try-catch blocks return user-friendly Chinese error messages
- **No validation**: Input validation is minimal (only checks empty strings)

### File Structure
- `app.py.bak` - Backup of main application file
- Static files use Flask's `url_for()` template function for path resolution
- No separate config file; API credentials hardcoded in `app.py`

## Key Dependencies
```
Flask - Web framework
openai - API client (configured for Qwen Max compatibility)
```

## Production Notes
Comments indicate Gunicorn/uWSGI recommended for production deployment. Currently runs with Flask's development server (`debug=True`).
