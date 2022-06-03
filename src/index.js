class Site { 
    constructor() {
        //boards 는 빈 배열
        this.boards = [];
    }

    addBoard(board){
       for (let i = 0; i<this.boards.length; i++){ // i는 배열의 길이까지 i번째까지 반복
           if (board.name === this.boards[i].name){ // 만일 board.name === this.boards[i].name 이라면
               throw new Error('중복입니다.') // 새로운 에러 발생후 던짐
           }
       }
       board.registerCheck = true //  board 등록 확인
       this.boards.push(board) // boards push 
    }

    findBoardByName(name){
        for (let i=0; i<this.boards.length; i++) { // 는 배열의 길이까지 i번째까지 반복
            if (name === this.boards[i].name) return this.boards[i] // 만일 board.name === this.boards[i].name 이라면
        }
    }
}

class Board {
    constructor(name) {
        this.name = name 
        this.registerCheck = false
        this.articles = []; //articles는 빈 배열
        if (name === null || name === '' ){
            throw new Error ('잘못된 접근입니다.')
        }
    }

    publish(article){
        const date = new Date()

        if (this.registerCheck === false) { 
            throw new Error('잘못된 접근입니다.') //  Site 에 추가된 Board만 사용 가능한 것으로 간주하며 사용 불가능한 Board에는 Article을 추가할 수 없다.
        }

        article.id = `${this.name}-${Math.floor(Math.random())} ` // Board에 Article을 추가할 때 Article에 ID를 자동 생성해서 부여해야 한다.
        article.createdDate = date.toISOString() //Board에 Article을 추가할 때 Article에 작성 일자가 들어가야 한다.
        article.registerCheck = true //Article 은 n개 이상 추가 할 수 있다. 
        this.articles.push(article) //
    }

    getAllArticles(){
        return this.articles //작성된 Article 목록을 조회 할 수 있어야 한다.
    }
}

class Article {
    constructor(article){
        //Article은 subject, content, author 3개의 데이터를 포함해야 하며 null 또는 빈 문자열("")은 허용하지 않는다.
        this.subject = article.subject; 
        this.content = article.content;
        this.author = article.author;

        this.comments = [] //comments는 빈배열
        this.registerCheck = false

        if (article.subject === '' || article.subject === null) {
                throw new Error('잘못된 접근입니다.');
        }else if (article.content === '' || article.content === null) {
                throw new Error('잘못된 접근입니다.');
        }else if (article.author === '' || article.author === null) {
        throw new Error('잘못된 접근입니다. ');
        }
    }

    reply(comment){
        const date = new Date()
        //Board에 추가된 Article만 사용 가능한 것으로 간주하며 사용 불가능한 Article에는 Comment를 추가할 수 없다.
        if (this.registerCheck == false) {
            throw new Error('잘못된 접근입니다.')
        }
        comment.id = `${this.name}-${Math.floor(Math.random())} `

        comment.createdDate = date.toISOString() //Article에 Comment를 추가할 때 Comment에 작성 일자가 들어가야 한다
        comment.registerCheck = true //Board에 추가된 Article만 사용 가능한 것으로 간주하며 사용 불가능한 Article에는 Comment를 추가할 수 없다. (4 ms)
        this.comments.push(comment) //Comment는 n개 이상 추가 할 수 있다. 
    }
    getAllComments(){
        return this.comments //작성된 Comment 목록을 조회 할 수 있어야 한다. 
    }
}

class Comment {
    constructor(comment){
        this.comment = comment.content
        this.author = comment.author

        //Comment는 content, author 2개의 데이터를 포함해야 하며 null 또는 빈 문자열("")은 허용하지 않는다.
        if (comment.content === '' || null) {
            throw new Error('잘못된 접근입니다.')
        }else if (comment.author === '' || null){
            throw new Error('잘못된 접근입니다.')
        }
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};


// this 왜 쓰냐 