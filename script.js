document.addEventListener("DOMContentLoaded", () => {
    const garden = document.getElementById('garden');
    const stemCanvas = document.getElementById('stem-canvas');
    const flowerLayer = document.getElementById('flower-layer');
    const clearBtn = document.getElementById('clear-btn');
    const welcomeMsg = document.getElementById('welcome-message');
    let isFirstClick = true;

    // Your personal list of messages! Add or change these as you like.
    const blessingMessages = [
        "May Allah bless you 🌸",
        "Ramadan Mubarak! 🌙",
        "Have a beautiful day ✨",
        "Smile, it's Sunnah! 😊",
        "Alhamdulillah for everything 🤍",
        "May your prayers be answered 🤲",
        "Wishing you peace and barakah",
        "SubhanAllah 🌿",
        "May light guide your path ✨",
        "May Allah grant you ease 🤍"
    ];

    const palettes = [
        ['#ff3399', '#ff99cc', '#ffff66'], 
        ['#9933ff', '#66ffff', '#ffffff'], 
        ['#ff6666', '#ffb366', '#ffee99'], 
        ['#cc00ff', '#ff0066', '#ffcc00']  
    ];

    const stemColors = ['#8cb320', '#4caf50', '#aeea00', '#00e676'];

    clearBtn.addEventListener('click', () => {
        stemCanvas.innerHTML = '';
        flowerLayer.innerHTML = '';
        welcomeMsg.classList.remove('fade-out');
        isFirstClick = true;
    });

    garden.addEventListener('click', (e) => {
        if (e.target === clearBtn) return;

        if (isFirstClick) {
            welcomeMsg.classList.add('fade-out');
            isFirstClick = false;
        }

        const targetX = e.clientX;
        const targetY = e.clientY;
        
        const startX = targetX + (Math.random() * 80 - 40); 
        const startY = window.innerHeight;

        const cp1X = startX + (Math.random() * 150 - 75);
        const cp1Y = startY - (startY - targetY) * 0.3;
        const cp2X = targetX + (Math.random() * 150 - 75);
        const cp2Y = targetY + (startY - targetY) * 0.3;

        const stem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const pathD = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${targetY}`;
        stem.setAttribute('d', pathD);
        
        const stemColor = stemColors[Math.floor(Math.random() * stemColors.length)];
        stem.setAttribute('stroke', `${stemColor}cc`); 
        stem.classList.add('stem-path');

        stemCanvas.appendChild(stem);

        const length = stem.getTotalLength();
        stem.style.strokeDasharray = length;
        stem.style.strokeDashoffset = length;
        
        const drawDuration = 1000 + Math.random() * 600;
        stem.animate([
            { strokeDashoffset: length },
            { strokeDashoffset: 0 }
        ], {
            duration: drawDuration,
            easing: 'ease-out',
            fill: 'forwards'
        });

        setTimeout(() => {
            createLovelyFlower(targetX, targetY);
        }, drawDuration - 100); 
    });

    function createLovelyFlower(x, y) {
        const head = document.createElement('div');
        head.className = 'flower-head';
        head.style.left = `${x}px`;
        head.style.top = `${y}px`;

        const palette = palettes[Math.floor(Math.random() * palettes.length)];
        const color1 = palette[0];
        const color2 = palette[1];
        const centerColor = palette[2];

        const numPetals = Math.floor(Math.random() * 5) + 6; 
        const baseAngle = (Math.random() * 40) - 20; 

        let innerHTML = '';
        
        for(let i = 0; i < numPetals; i++) {
            const angleSpread = 120; 
            const rot = baseAngle - (angleSpread / 2) + (i * (angleSpread / (numPetals - 1)));
            const finalRot = rot + (Math.random() * 10 - 5);
            
            const gradient = `radial-gradient(ellipse at bottom, ${centerColor} 5%, ${color1} 50%, ${color2} 100%)`;
            const petalWidth = 25 + Math.random() * 20; 
            const petalHeight = 45 + Math.random() * 35; 
            
            const delay = (i * 0.08); 

            innerHTML += `<div class="petal" style="
                --rot: ${finalRot}deg;
                background: ${gradient};
                box-shadow: 0 0 15px ${color1}80;
                width: ${petalWidth}px;
                height: ${petalHeight}px;
                z-index: ${Math.floor(Math.random() * 10)};
                animation-delay: ${delay}s;
            "></div>`;
        }

        innerHTML += `<div class="center-glow" style="
            background: ${centerColor}; 
            box-shadow: 0 0 25px 12px ${centerColor};
            width: 15px;
            height: 15px;
            z-index: 20;
        "></div>`;

        const numParticles = Math.floor(Math.random() * 4) + 3; 
        for(let i = 0; i < numParticles; i++) {
            const tx = (Math.random() * 100 - 50) + 'px'; 
            const ty = (Math.random() * -100 - 50) + 'px'; 
            const pDelay = (Math.random() * 0.5); 

            innerHTML += `<div class="particle" style="
                background: ${centerColor};
                box-shadow: 0 0 5px ${centerColor}, 0 0 10px ${color1};
                --tx: ${tx};
                --ty: ${ty};
                animation-delay: ${pDelay}s;
            "></div>`;
        }

        // --- NEW: Add the random blessing message ---
        const randomMessage = blessingMessages[Math.floor(Math.random() * blessingMessages.length)];
        
        // The message gets the same glow color as the flower!
        innerHTML += `<div class="flower-message" style="--msg-glow: ${color1};">
            ${randomMessage}
        </div>`;

        head.innerHTML = innerHTML;
        flowerLayer.appendChild(head);
        
        // Cleanup particles and messages after they finish to keep the browser running smoothly
        setTimeout(() => {
            const particles = head.querySelectorAll('.particle, .flower-message');
            particles.forEach(p => p.remove());
        }, 5000); // Wait 5 seconds to remove them from the code
    }
});
