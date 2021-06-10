const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MP3'

const player = $('.player')
const heading = $('header h2')
const singer = $('header h3')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.container__music--list')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem('PLAYER_STORAGE_KEY')) || {},

    songs: [
        {
        name: "Khó Vẽ Nụ Cười",
        singer: "ĐạtG x Du Uyên",
        path: "./assets/img/songs/song1.mp3",
        image: "./assets/img/songimage/song1.jpg"
        },
        {
        name: "Câu Hẹn Câu Thề",
        singer: "Đình Dũng",
        path: "./assets/img/songs/song2.mp3",
        image: "./assets/img/songimage/song2.jpg"
        },
        {
        name: "Sài Gòn Đau Lòng Quá",
        singer: "Hứa KIm Tuyền",
        path: "./assets/img/songs/song3.mp3",
        image: "./assets/img/songimage/song3.jpg"
        },
        {
        name: "Tình Bạn Diệu Kỳ",
        singer: "Amee x Karik x Ricky Star",
        path: "./assets/img/songs/song4.mp3",
        image: "./assets/img/songimage/song4.jpg"
        },
        {
        name: "Chỉ Là Không Cùng Nhau",
        singer: "Tăng Phúc",
        path: "./assets/img/songs/song5.mp3",
        image: "./assets/img/songimage/song5.jpg"
        },
        {
        name: "Laylalay",
        singer: "Jack",
        path: "./assets/img/songs/song6.mp3",
        image: "./assets/img/songimage/song6.jpg"
        },
        {
        name: "Nàng Thơ",
        singer: "Hoàng Dũng",
        path: "./assets/img/songs/song7.mp3",
        image: "./assets/img/songimage/song7.jpg"
        },
        {
        name: "Phải Chăng Em Đã Yêu",
        singer: "JukySan x RedT",
        path: "./assets/img/songs/song8.mp3",
        image: "./assets/img/songimage/song8.jpg"
        },
        {
        name: "Kẻ Cắp Gặp Bà Già",
        singer: "Hoàng Thuỳ Linh",
        path: "./assets/img/songs/song9.mp3",
        image:
            "./assets/img/songimage/song9.jpg"
        },
        {
        name: "Trên Tình Bạn Dưới Tình Yêu",
        singer: "MIN",
        path: "./assets/img/songs/song10.mp3",
        image:
            "./assets/img/songimage/song10.jpg"
        },
        {
            name: "Chúng Ta Của Hiện Tại",
            singer: "Sơn Tùng MTP",
            path: "./assets/img/songs/song11.mp3",
            image:
                "./assets/img/songimage/song11.jpg"
        },
        {
            name: "Muộn Rồi Mà Sao Còn",
            singer: "Sơn Tùng MTP",
            path: "./assets/img/songs/song12.mp3",
            image:
                "./assets/img/songimage/song12.jpg"
        },
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem('PLAYER_STORAGE_KEY', JSON.stringify(this.config))
    },

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <img src="${song.image}" alt="" class="container__music-img">
                <div class="container__music--detail">
                    <div class="container__music--heading">
                    ${song.name}
                    </div>
                    <div class="singer">
                    ${song.singer}
                    </div>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong' , {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth
        
        // Xử lý cd quay và dừng
        const cdThumbAnimate = cd.animate([
            {transform: 'rotate(360deg'}
        ], {
            duration: 10000, // 10 giây
            iterations: Infinity
        })
        cdThumbAnimate.pause()


        // Xử lý phóng to thu nhỏ cd
        // document.onscroll = function() {
        //     const scrollTop = window.scrollY || document.documentElement.scrollTop
        //     const newCdWidth = cdWidth - scrollTop

        //     cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
        //     cd.style.opacity = newCdWidth / cdWidth
        // }

        // Xử lý khi click play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // Khi song được play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // Khi song bị pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // Xử lý khi tua song
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        // Xủ lý khi next song
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        //Xử lý khi prev song
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Xử lý khi bật/tắt random
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // Xử lý next song khi audio ended
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // xử lý khi lặp lại song
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')
            ) {
                // Xử lý khi click vào song 
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }

                // Xử lý khi click vào song option
                if (e.target.closest('.option')) {

                }
            }
        }
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    loadCurrentSong: function() {

        heading.textContent = this.currentSong.name
        singer.textContent = this.currentSong.singer
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length ) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong()
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'nearest'
                }
            )
        }, 300)
      $('.song.active')  
    },
    start: function() {
        // Gán cấu hình từ config
        this.loadConfig()

        // Định nghĩa các thuộc tính cho object
        this.defineProperties()

        //Lắng nghe / xử lý các sự kiện (DOM Events)
        this.handleEvents()

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        // Render playlist
        this.render()   

        // Hiển thị trạng thái ban đầu của btnRepeat và btnRandom
        repeatBtn.classList.toggle('active', this.isRepeat)
        randomBtn.classList.toggle('active', this.isRandom)
    }
}

app.start()


    