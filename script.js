// 1. Element Selectors
const display = document.getElementById('display');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');

// 2. Initialize State from LocalStorage
let count = JSON.parse(localStorage.getItem('mySavedCount')) || 0;

// 3. Update Function (The "Brain")
const updateApp = (isNewHigh = false) => {
    // Update text
    display.textContent = count;
    
    // Save to LocalStorage
    localStorage.setItem('mySavedCount', JSON.stringify(count));

    // Handle Visual States
    if (count === 0) {
        display.classList.add('at-zero');
        display.classList.remove('milestone');
    } else if (count >= 10) {
        display.classList.remove('at-zero');
        display.classList.add('milestone');
        
        // Trigger Confetti only if we just hit 10 or a multiple of 10
        if (isNewHigh && count % 10 === 0) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    } else {
        display.classList.remove('at-zero', 'milestone');
    }
};

// 4. Event Listeners
incrementBtn.addEventListener('click', () => {
    count++;
    updateApp(true);
});

decrementBtn.addEventListener('click', () => {
    if (count > 0) {
        count--;
        updateApp();
    }
});

resetBtn.addEventListener('click', () => {
    count = 0;
    updateApp();
});

// Run once on load to set initial state
updateApp();