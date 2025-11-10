"""
Vercel 健康检查端点
用于诊断部署问题
"""
from flask import jsonify
import os
import sys

def register_health_check(app):
    """注册健康检查路由"""
    
    @app.route('/health')
    def health_check():
        """健康检查端点"""
        return jsonify({
            "status": "ok",
            "python_version": sys.version,
            "environment": {
                "has_api_key": bool(os.getenv("DASHSCOPE_API_KEY")),
                "api_key_prefix": os.getenv("DASHSCOPE_API_KEY", "")[:10] + "..." if os.getenv("DASHSCOPE_API_KEY") else "NOT_SET"
            },
            "routes": [str(rule) for rule in app.url_map.iter_rules()]
        })
    
    @app.route('/test')
    def test_page():
        """简单测试页面"""
        return """
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Vercel Test Page</title>
        </head>
        <body>
            <h1>✅ Vercel 部署成功!</h1>
            <p>如果你能看到这个页面，说明 Flask 应用正在正常运行。</p>
            <h2>测试 API:</h2>
            <button onclick="testAPI()">测试健康咨询 API</button>
            <button onclick="testChat()">测试聊天 API</button>
            <pre id="result"></pre>
            
            <script>
                async function testAPI() {
                    const result = document.getElementById('result');
                    result.textContent = '正在测试...';
                    try {
                        const response = await fetch('/get_suggestion', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                disease: 'test headache',
                                userProfile: '',
                                language: 'en'
                            })
                        });
                        const data = await response.json();
                        result.textContent = JSON.stringify(data, null, 2);
                    } catch (error) {
                        result.textContent = 'Error: ' + error.message;
                    }
                }
                
                async function testChat() {
                    const result = document.getElementById('result');
                    result.textContent = '正在测试...';
                    try {
                        const response = await fetch('/chat', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                message: 'Hello',
                                userProfile: '',
                                language: 'en'
                            })
                        });
                        const data = await response.json();
                        result.textContent = JSON.stringify(data, null, 2);
                    } catch (error) {
                        result.textContent = 'Error: ' + error.message;
                    }
                }
            </script>
        </body>
        </html>
        """

if __name__ == '__main__':
    from app import app
    register_health_check(app)
    app.run(debug=True)
