if (window.location.pathname === "/") {
    const singleBlock = document.querySelectorAll('ul');
    let blockPos = rotate = 0;
    let scale = 1;
    let fireScroll = false;

    forJsOff();

    function forJsOff() {
        document.querySelector('.index').style.setProperty('overflow', 'hidden');

        const game1 = document.querySelector('ul:first-child a');
        const game2 = document.querySelector('ul:nth-child(2) a');
        const game3 = document.querySelector('ul:nth-child(3) a');
        const game4 = document.querySelector('ul:last-child a');

        document.querySelector('ul:first-child li:nth-child(4)').appendChild(game1);
        document.querySelector('ul:nth-child(2) li:nth-child(3)').appendChild(game2);
        document.querySelector('ul:nth-child(3) li:nth-child(2)').appendChild(game3);
        document.querySelector('ul:last-child li:first-child').appendChild(game4);
    }

    window.addEventListener('wheel', (e) => {
        if (!fireScroll) {
            fireScroll = true;
            if (e.deltaY < 0) {
                blockPos = blockPos + singleBlock[0].offsetWidth;
                if (blockPos > 0) {
                    blockPos = 0;
                } else {
                    rotate = rotate - 90;
                    if (blockPos === 0) {
                        scale = scale + 1;
                        if (scale > 1) {
                            scale = 1;
                        }
                        document.querySelector('h1').style.opacity = '1';
                    }
                }
            } else if (e.deltaY > 0) {
                blockPos = blockPos - singleBlock[0].offsetWidth;
                if (blockPos < 0 - singleBlock[0].offsetWidth * 4) {
                    blockPos = 0 - singleBlock[0].offsetWidth * 4;
                } else {
                    rotate = rotate + 90;
                    scale = scale - 1;
                    if (scale < 0) {
                        scale = 0;
                    }
                    document.querySelector('h1').style.opacity = '0';
                }
            }
            singleBlock.forEach(block => {
                block.style.setProperty('--rotate', rotate + 'deg')
                block.style.setProperty('--move', blockPos + 'px')
            });
            document.querySelector('h1').style.setProperty('--scale', scale);
            setTimeout(() => {
                fireScroll = false
            }, 1000);
        }
    });
}