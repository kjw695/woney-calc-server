const fs = require('fs');
const fetch = require('node-fetch');

// 깃허브 설정(Secrets)에 저장된 키를 가져옵니다
const API_KEY = process.env.EXCHANGE_API_KEY; 
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/KRW`;

async function updateRates() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.result === 'success') {
            const output = {
                last_update: Date.now(),
                rates: data.conversion_rates
            };
            
            // rates.json 파일로 저장
            fs.writeFileSync('rates.json', JSON.stringify(output, null, 2));
            console.log('환율 업데이트 성공!');
        } else {
            console.error('API 호출 실패:', data);
            process.exit(1);
        }
    } catch (error) {
        console.error('에러 발생:', error);
        process.exit(1);
    }
}

updateRates();
