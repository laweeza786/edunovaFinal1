  const minutesDisplay = document.getElementById('minutes');
        const secondsDisplay = document.getElementById('seconds');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        const progressFront = document.querySelector('.progress-circle-front');

        // Timer variables
        let totalSeconds = 0;
        let interval;
        const circumference = 628; // 2 * π * r (where r = 40 in our SVG)

        // Format time to two digits
        function formatTime(time) {
            return time < 10 ? `0${time}` : time;
        }

        // Update display
        function updateDisplay() {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            
            minutesDisplay.textContent = formatTime(minutes);
            secondsDisplay.textContent = formatTime(seconds);
            
            // Update progress circle
            progressFront.style.strokeDashoffset = circumference * (1 - totalSeconds / 3600);
        }

        // Start timer
        function startTimer() {
            interval = setInterval(() => {
                totalSeconds++;
                updateDisplay();
                
                if (totalSeconds >= 3600) {
                    clearInterval(interval);
                    startBtn.disabled = true;
                }
            }, 1000);
            
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
        }

        // Pause timer
        function pauseTimer() {
            clearInterval(interval);
            pauseBtn.style.display = 'none';
            startBtn.style.display = 'block';
        }

        // Reset timer
        function resetTimer() {
            clearInterval(interval);
            totalSeconds = 0;
            updateDisplay();
            pauseBtn.style.display = 'none';
            startBtn.style.display = 'block';
            startBtn.disabled = false;
        }

        // Event listeners
        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);

        // Initialize
        updateDisplay();