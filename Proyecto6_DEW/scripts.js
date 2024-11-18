class VirtualKeyboard {
    constructor() {
        this.keysLayout = [
            '`1234567890-=', 'Backspace',
            'Tabqwertyuiop[]\\',
            'CapsLockasdfghjkl;\'Enter',
            'Shiftzxcvbnm,./Shift',
            'ControlAlt Space AltGr Control'
        ];
        this.screenText = '';
        this.shiftActive = false;
        this.capsLockActive = false;
        this.keyboardElement = document.getElementById('keyboard');
        this.screenElement = document.getElementById('screen');
        this.init();
    }

    init() {
        this.createKeys();
        document.addEventListener('keydown', (e) => this.handlePhysicalKey(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        this.keyboardElement.addEventListener('click', (e) => this.handleVirtualKey(e));
    }

    createKeys() {
        this.keysLayout.forEach(row => {
            [...row].forEach(char => {
                const keyDiv = document.createElement('div');
                keyDiv.className = 'key';
                keyDiv.textContent = char === ' ' ? 'Space' : char;
                keyDiv.dataset.key = char;
                if (char === ' ') keyDiv.classList.add('space');
                if (['Backspace', 'Enter', 'CapsLock', 'Shift', 'Tab', 'Control', 'Alt', 'AltGr'].includes(char)) {
                    keyDiv.classList.add('wide');
                }
                this.keyboardElement.appendChild(keyDiv);
            });
        });
    }

    handlePhysicalKey(event) {
        const key = event.key;
        const isSpecialKey = ['Backspace', 'Enter', 'CapsLock', 'Tab', 'Shift', 'Alt', 'Control', ' '].includes(key);

        if (key === 'CapsLock') this.capsLockActive = !this.capsLockActive;
        if (key === 'Shift') this.shiftActive = true;

        const keyPressed = this.processKey(event.key);
        if (keyPressed || isSpecialKey) event.preventDefault();

        this.updateScreen(keyPressed);
        this.highlightKey(key, true);
    }

    handleKeyUp(event) {
        if (event.key === 'Shift') this.shiftActive = false;
        this.highlightKey(event.key, false);
    }

    handleVirtualKey(event) {
        const keyElement = event.target.closest('.key');
        if (!keyElement) return;

        const key = keyElement.dataset.key;
        if (key === 'CapsLock') this.capsLockActive = !this.capsLockActive;
        if (key === 'Shift') this.shiftActive = !this.shiftActive;

        const keyPressed = this.processKey(key);
        this.updateScreen(keyPressed);
    }

    processKey(key) {
        if (key === 'Backspace') {
            this.screenText = this.screenText.slice(0, -1);
            return '';
        }
        if (key === 'Enter') return '\n';
        if (key === 'Tab') return '\t';
        if (key === ' ') return ' ';

        if (this.shiftActive || this.capsLockActive) {
            return key.toUpperCase();
        }
        return key.toLowerCase();
    }

    updateScreen(text) {
        if (text) this.screenText += text;
        this.screenElement.textContent = this.screenText;
    }

    highlightKey(key, isActive) {
        const keyElement = Array.from(this.keyboardElement.children).find(
            el => el.dataset.key === key || el.textContent.toLowerCase() === key.toLowerCase()
        );
        if (keyElement) {
            keyElement.classList.toggle('active', isActive);
        }
    }
}

const keyboard = new VirtualKeyboard();
