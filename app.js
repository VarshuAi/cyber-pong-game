
            const canvas = document.getElementById('pong-canvas');
            const ctx = canvas.getContext('2d');
            
            let ball = { x: 200, y: 150, dx: 3, dy: 2, r: 8 };
            let p1 = { x: 10, y: 120, w: 10, h: 60 };
            let p2 = { x: 380, y: 120, w: 10, h: 60 };

            canvas.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                p1.y = e.clientY - rect.top - p1.h/2;
            });

            function update() {
                ball.x += ball.dx;
                ball.y += ball.dy;
                
                // Wall bounds
                if (ball.y < 0 || ball.y > canvas.height) ball.dy *= -1;
                
                // AI Movement
                p2.y += (ball.y - (p2.y + p2.h/2)) * 0.1;
                
                // Paddle collisions
                if (ball.x < p1.x + p1.w && ball.y > p1.y && ball.y < p1.y + p1.h) {
                    ball.dx *= -1.1;
                }
                if (ball.x > p2.x - p2.w && ball.y > p2.y && ball.y < p2.y + p2.h) {
                    ball.dx *= -1.1;
                }

                // Reset on score
                if (ball.x < 0 || ball.x > canvas.width) {
                    ball.x = 200;
                    ball.y = 150;
                    ball.dx = 3 * (ball.dx > 0 ? -1 : 1);
                    ball.dy = 2;
                }

                ctx.clearRect(0,0,canvas.width,canvas.height);
                
                // Draw
                ctx.fillStyle = '#ff007f';
                ctx.fillRect(p1.x, p1.y, p1.w, p1.h);
                ctx.fillRect(p2.x, p2.y, p2.w, p2.h);
                
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
                ctx.fillStyle = '#00F5FF';
                ctx.fill();
                
                requestAnimationFrame(update);
            }
            update();
        