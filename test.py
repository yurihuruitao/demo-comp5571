# coding=utf-8
 
import dashscope
from dashscope.audio.tts import SpeechSynthesizer
import os
 
dashscope.api_key=os.getenv('DASHSCOPE_API_KEY')

# 确保test文件夹存在
os.makedirs('test', exist_ok=True)
 
result = SpeechSynthesizer.call(model='sambert-zhiqi-v1',
                                text='你好我好大家好',
                                sample_rate=48000,
                                rate=1.2,
                                format='wav')
 
if result.get_audio_data() is not None:
    with open('test/output.wav', 'wb') as f:
        f.write(result.get_audio_data())
print('  get response: %s' % (result.get_response()))