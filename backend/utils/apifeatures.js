class ApiFeatures{
    constructor(query,queryStr)
    {
        this.query=query;
        this.queryStr=queryStr;
    }


//searching with the help of keyword
search(){
    const keyword=this.queryStr.keyword?
    {
        name:{
            $regex:this.queryStr.keyword,
            $options:"i",
        },
    }
    :{};
    this.query=this.query.find({...keyword});
    return this;
}

// this is for category
filter(){
    const queryCopy={...this.queryStr};

    //removing some fields for category

    const removedFields=["keyword","page","limit"];

    removedFields.forEach((key)=> delete queryCopy[key]);

    //filter price and rating
    // console.log(queryCopy);
    let queryStr=JSON.stringify(queryCopy);
     queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);

    this.query=this.query.find(JSON.parse(queryStr));
    return this;
}


    //content on page and we call page limit

    pagination(resultPerPage)
    {
        const currentPage=Number(this.queryStr.page)|| 1;
        const skip=resultPerPage*(currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }

}

module.exports=ApiFeatures;