Vue.createApp({
    data: () => ({
        title: 'Home work',
        step: 1,
        content: [
            {
                title: 'first step',
                text: 'first step text content'
            },
            {
                title: 'second step',
                text: 'second step text content'
            },
            {
                title: 'third step',
                text: 'third step text content'
            },
            {
                title: 'four step',
                text: 'four step text content'
            },
            {
                title: 'fifth step',
                text: 'fifth step text content'
            },
        ],
        buttons: [

        ],
        isRestart: false
    }),
    computed: {
        contentRender() {
            // Фильтруем контент и возвращаем только элемент текущего шага
            return this.content.filter((item, i) => (i + 1) === this.step);
        },
        isCompleted(){
           return  this.content.length === this.step
        },
        buttonsRender(){
            return this.buttons.filter((item, i) => {
               switch (item.name) {
                   case 'Back':
                       item.class = ['btn'];
                       if (this.step === 1) {
                           item.class.push('secondary');
                       }
                       return !this.isRestart
                   case 'Next':
                       return !this.isCompleted
                   case 'Completed':
                       return this.isCompleted && !this.isRestart
                   case 'Restart':
                       return this.isRestart
               }
            });
        }
    },
    methods: {
        nextStep() {
            if (this.step < this.content.length) {
                this.step ++;
            }
        },
        backStep() {
            if (this.step > 1) {
                this.step --;
            }
        },
        completed(){
            this.isRestart = true
        },
        restart(){
            this.step = 1;
            this.isRestart = false
        }
    },
    created() {
        this.buttons = [
            {
                name: 'Back',
                class: ['btn'],
                action: this.backStep
            },
            {
                name: 'Next',
                class: ['btn', 'primary'],
                action: this.nextStep
            },
            {
                name: 'Completed',
                class: ['btn', 'primary'],
                action: this.completed
            },
            {
                name: 'Restart',
                class: ['btn'],
                action: this.restart
            },
        ]
    },
    watch: {
        // step(){
        //     this.buttonsRender()
        // }
    }
}).mount('#app')