//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _=require("lodash");

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let com = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res)
{
  res.render("home",{arr:com});
})

app.get("/about",function(req,res)
{
  res.render("about",{aboutnote:aboutContent});
})

app.get("/contact",function(req,res)
{
  res.render("contact",{contactnote:contactContent});
})

app.get("/compose",function(req,res)
{
  res.render("compose");
})

app.post("/compose",function(req,res)
{
  res.redirect("/compose")
})

app.post("/",function(req,res)
{
  let item=req.body.newitem;
  let contentt = req.body.texty;

  const post={
    title:item,
    content:contentt,
  };
  
  com.push(post)

  res.redirect("/")
})









app.get("/post/:postName",function(req,res){
  const reqtitle=_.lowerCase(req.params.postName);

  
  com.forEach(function(tit)
  {
    const storedtitle = _.lowerCase(tit.title);
    if(storedtitle==reqtitle)
    {
      res.render("post",{posttitle:tit.title,
        postcontent:tit.content
      })

    } 
  })
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
