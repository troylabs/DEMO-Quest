import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { SharedArray } from 'k6/data';

// Base URL - Change this to your app URL
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

// Test users (pre-created or will be created during the test)
const users = new SharedArray('users', function() {
  return Array.from({ length: 1000 }, (_, i) => ({
    email: `testuser${i}@example.com`,
    password: 'TestPassword123',
    name: `Test User ${i}`
  }));
});

// Test configuration - adjust as needed
export const options = {
    stages: [
      { duration: '170s', target: 750 },   // Ramp up to 750 users
      { duration: '110s', target: 750 },    // Stay at 750 users
    ],
};

// Main test function
export default function() {
  const user = users[Math.floor(Math.random() * users.length)];
  const boardType = Math.random() > 0.5 ? 'board1' : 'board2';
  let userId = null;
  let cookieJar = http.cookieJar();
  
  // Login flow
  group('login', function() {
    const res = http.post(`${BASE_URL}/api/auth/login`, JSON.stringify({
      email: user.email, 
      password: user.password
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
    
    check(res, {
      'login successful': (r) => r.status === 200,
    });
    
    if (res.status === 200) {
      try {
        const body = JSON.parse(res.body);
        userId = body.user._id;
        // Cookie is automatically stored in cookieJar
      } catch (e) {
        console.error("Failed to parse login response");
      }
    }
  });
  
  sleep(1);
  
  // If login failed, try signup
  if (!userId) {
    group('signup', function() {
      const res = http.post(`${BASE_URL}/api/auth/signup`, JSON.stringify({
        email: user.email,
        password: user.password,
        name: user.name
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
      
      check(res, {
        'signup successful': (r) => r.status === 200,
      });
      
      if (res.status === 200) {
        try {
          const body = JSON.parse(res.body);
          userId = body.user._id;
          // Cookie is automatically stored in cookieJar
        } catch (e) {
          console.error("Failed to parse signup response");
        }
      }
    });
    
    sleep(1);
  }
  
  // Only continue if we have a userId
  if (userId) {
    group('verify_auth', function() {
        const res = http.get(`${BASE_URL}/api/auth/me`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        check(res, {
          'auth verification successful': (r) => r.status === 200,
          'returns correct userId': (r) => {
            try {
              const body = JSON.parse(r.body);
              return body.userId === userId;
            } catch (e) {
              return false;
            }
          }
        });
    });
      
    sleep(1);

    // Get bingo progress
    group('fetch_progress', function() {
      const res = http.get(
        `${BASE_URL}/api/bingo/progress?userId=${userId}&boardType=${boardType}`
      );
      
      check(res, {
        'progress loaded': (r) => r.status === 200,
      });
      
      let markedSquares = [];
      let triedSquares = [];
      
      if (res.status === 200) {
        try {
          const body = JSON.parse(res.body);
          markedSquares = body.allMarked || [];
          triedSquares = body.tried || [];
        } catch (e) {
          console.error("Failed to parse progress response");
        }
      }
      
      // Find squares that haven't been tried yet
      const availableSquares = [];
      for (let i = 0; i < 25; i++) {
        if (triedSquares.indexOf(i) === -1) {
          availableSquares.push(i);
        }
      }
      
      // Only try to answer if there are available squares
      if (availableSquares.length > 0) {
        // Try to answer a question
        group('answer_question', function() {
          const boothIndex = availableSquares[Math.floor(Math.random() * availableSquares.length)];
          const possibleAnswers = ['A', 'B', 'C', 'D'];
          const answer = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
          
          const res = http.post(`${BASE_URL}/api/bingo/check`, JSON.stringify({
            userId: userId,
            boothIndex: boothIndex,
            answer: answer,
            boardType: boardType
          }), {
            headers: { 'Content-Type': 'application/json' },
          });
          
          check(res, {
            'answer submitted': (r) => r.status === 200,
          });
        });
      }
      
      // Test leaderboard - add this new test group
      group('fetch_leaderboard', function() {
        const res = http.get(`${BASE_URL}/leaderboard`);
        
        check(res, {
          'leaderboard page loads': (r) => r.status === 200,
          'leaderboard contains content': (r) => r.body.includes('Leaderboard')
        });
      });
      
      // 5% chance of logging out
      if (Math.random() < 0.05) {
        group('logout', function() {
          const res = http.post(`${BASE_URL}/api/auth/logout`, {});
          
          check(res, {
            'logout successful': (r) => r.status === 200,
          });
        });
      }
    });
  }
  
  sleep(Math.random() * 3 + 2);
}