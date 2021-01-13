var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 55558);




app.get('/',function(req,res){


   
  
    res.render('index');
     });

app.get('/characters',function(req,res){


   
  
    res.render('characters');
     });

app.get('/characterff',function(req,res){


   
  
    res.render('characterff');
     });

app.get('/characterorg',function(req,res){


   
  
    res.render('characterorg');
     });

app.get('/characteraur',function(req,res){


   
  
    res.render('characteraur');
     });

app.get('/organizations',function(req,res){


   
  
    res.render('organizations');
     });
app.get('/locations',function(req,res){


   
  
    res.render('locations');
     });

app.get('/aura-types',function(req,res){


   
  
    res.render('aura-types');
     });

app.get('/editOrg',function(req,res){

    var context = {};
    context.name=req.query.Name;
    context.Location=req.query.Location;
    context.alignment=req.query.Alignment;
    context.OrgId=req.query.OrgId
  
    res.render('editOrg',context);
     });

app.get('/editorOrg',function(req,res,next){
  
  mysql.pool.query("UPDATE hxh_organizations SET `Name`=?,`LocID`=?,`Alignment`=? WHERE `OrgId`=?",
    [req.query.name,req.query.LocId,req.query.alignment,req.query.OrgId],
    function(err){
      if(err)
      {
        next(err);
        return;
      }
      res.status(200).send(null);
    })

})

app.get('/editLoc',function(req,res){

    var context = {};
    context.name=req.query.Name;
    context.LocId=req.query.LocID;
  
    res.render('editLoc',context);
     });

app.get('/editorLoc',function(req,res,next){
  
  mysql.pool.query("UPDATE hxh_location SET `Name`=? WHERE `LocID`=?",
    [req.query.name,req.query.LocId],
    function(err){
      if(err)
      {
        next(err);
        return;
      }
      res.status(200).send(null);
    })

})

app.get('/editLoc',function(req,res){

    var context = {};
    context.name=req.query.Name;
    context.LocId=req.query.LocID;
  
    res.render('editLoc',context);
     });

app.get('/editorLoc',function(req,res,next){
  
  mysql.pool.query("UPDATE hxh_location SET `Name`=? WHERE `LocID`=?",
    [req.query.name,req.query.LocId],
    function(err){
      if(err)
      {
        next(err);
        return;
      }
      res.status(200).send(null);
    })

})

app.get('/editAura',function(req,res){

    var context = {};
    context.name=req.query.Aura;
    context.AuraId=req.query.Id;
  
    res.render('editAura',context);
     });

app.get('/editorAura',function(req,res,next){
  
  mysql.pool.query("UPDATE hxh_aura_type SET `aura_name`=? WHERE `aura_id`=?",
    [req.query.name,req.query.AuraId],
    function(err){
      if(err)
      {
        next(err);
        return;
      }
      res.status(200).send(null);
    })

})

app.get('/editChar',function(req,res){

    var context = {};
    context.first_name=req.query.First;
    context.last_name=req.query.Last;
    context.race=req.query.Race;
    context.CharId=req.query.Id;
  
    res.render('editChar',context);
     });

app.get('/editorChar',function(req,res,next){
  
  mysql.pool.query("UPDATE hxh_character SET `first_name`=?, `last_name`=?, `race`=? WHERE `character_id`=?",
    [req.query.first_name, req.query.last_name, req.query.race, req.query.CharId],
    function(err){
      if(err)
      {
        next(err);
        return;
      }
      res.status(200).send(null);
    })

})


app.get('/selectChar',function(req,res,next){

    mysql.pool.query("SELECT * FROM hxh_character", function(err,rows,fields)
    {
      if(err)
        {
          next(err);
          return;
        }
      
        res.status(200).send(JSON.stringify(rows));
      })
   
     });

app.get('/selectChar2',function(req,res,next){

    mysql.pool.query("SELECT character_id as `Id`, first_name as `First`, last_name as `Last`, race as `Race` FROM hxh_character", function(err,rows,fields)
    {
      if(err)
        {
          next(err);
          return;
        }
      
        res.status(200).send(JSON.stringify(rows));
      })
   
     });

app.get('/selectOrg',function(req,res,next){

    mysql.pool.query("SELECT * FROM hxh_organizations", function(err,rows,fields)
    {
      if(err)
        {
          next(err);
          return;
        }
      
        res.status(200).send(JSON.stringify(rows));
      })
   
     });

app.get('/selectOrg2',function(req,res,next){

    mysql.pool.query("SELECT OrgId,o.Name,l.LocId, l.name as Location,Alignment FROM hxh_organizations o INNER JOIN hxh_location l ON o.LocID=l.LocID ORDER BY OrgId", function(err,rows,fields)
    {
      if(err)
        {
          next(err);
          return;
        }
      
        res.status(200).send(JSON.stringify(rows));
      })
   
     });

app.get('/selectLoc',function(req,res,next){

    mysql.pool.query("SELECT * FROM hxh_location", function(err,rows,fields)
    {
      if(err)
        {
          next(err);
          return;
        }
      
        res.status(200).send(JSON.stringify(rows));
      })
   
     });


app.get('/selectAur',function(req,res,next){

    mysql.pool.query("SELECT * FROM hxh_aura_type", function(err,rows,fields)
    {
      if(err)
        {
          next(err);
          return;
        }
      
        res.status(200).send(JSON.stringify(rows));
      })
   
     });

app.get('/selectAur2',function(req,res,next){

    mysql.pool.query("SELECT aura_id as Id, aura_name as Aura FROM hxh_aura_type", function(err,rows,fields)
    {
      if(err)
        {
          next(err);
          return;
        }
      
        res.status(200).send(JSON.stringify(rows));
      })
   
     });

app.get('/selectFF',function(req,res,next){

    mysql.pool.query("SELECT first_name, last_name, character_friends,character_id2,character_id1 FROM hxh_character_relationships r INNER JOIN hxh_character c ON r.character_id2=c.character_id WHERE r.character_id1=?", [req.query.charId], function(err,rows,fields)
    {
      if(err)
        {
          next(err);
          return;
        }
      
        res.status(200).send(JSON.stringify(rows));
      })
   
     });

app.get('/selectCharOrg',function(req,res,next){
  
    mysql.pool.query("SELECT Name, r.OrgId, c.character_id FROM hxh_CharOrg r INNER JOIN hxh_character c ON r.character_id=c.character_id INNER JOIN hxh_organizations o ON r.OrgId=o.OrgId WHERE r.character_id=?", [req.query.charId], function(err,rows,fields)
    {
      if(err)
        {
          next(err);
          return;
        }
      
        res.status(200).send(JSON.stringify(rows));
      })
   
     });


app.get('/selectCharAura',function(req,res,next){
  
    mysql.pool.query("SELECT aura_name, CA.aura_id, c.character_id FROM hxh_CharAura CA INNER JOIN hxh_character c ON CA.character_id=c.character_id INNER JOIN hxh_aura_type a ON CA.aura_id=a.aura_id WHERE CA.character_id=?", [req.query.charId], function(err,rows,fields)
    {
      if(err)
        {
          next(err);
          return;
        }
      
        res.status(200).send(JSON.stringify(rows));
      })
   
     });


app.get('/insertChar', function(req,res,next){

   mysql.pool.query("INSERT INTO hxh_character(`first_name`,`last_name`,`race`) VALUES (?,?,?)", 
    [req.query.first_name, req.query.last_name, req.query.race],
    function(err)
      {
       
        if(err)
        {
          
        
          next(err);
          return;
        }
      });
   res.status(200).send(null);
});

app.get('/insertCharOrg', function(req,res,next){

   mysql.pool.query("INSERT INTO hxh_CharOrg(`character_id`,`OrgId`) VALUES (?,?)", 
    [req.query.CharId, req.query.OrgId],
    function(err)
      {
       
        if(err)
        {
          
        
          next(err);
          return;
        }
      });
   res.status(200).send(null);
});

app.get('/insertCharAura', function(req,res,next){

   mysql.pool.query("INSERT INTO hxh_CharAura(`character_id`,`aura_id`) VALUES (?,?)", 
    [req.query.CharId, req.query.aura_id],
    function(err)
      {
       
        if(err)
        {
          
        
          next(err);
          return;
        }
      });
   res.status(200).send(null);
});
app.get('/insertCharFF', function(req,res,next){

if (req.query.ff==0)
{
  req.query.ff=0;

}
   mysql.pool.query("INSERT INTO hxh_character_relationships (`character_friends`,`character_id1`,`character_id2`) VALUES (?, ?, ?)", 
    [req.query.ff,req.query.id1, req.query.id2],
    function(err)
      {
       
        if(err)
        {
          
        
          next(err);
          return;
        }
      });
   mysql.pool.query("INSERT INTO hxh_character_relationships (`character_friends`,`character_id1`,`character_id2`) VALUES (?,?,?)", 
    [req.query.ff,req.query.id2, req.query.id1],
    function(err)
      {
       
        if(err)
        {
          
        
          next(err);
          return;
        }
      });
   res.status(200).send(null);

});

app.get('/insertOrg', function(req,res,next){
 
   mysql.pool.query("INSERT INTO hxh_organizations(`name`,`LocID`,`Alignment`) VALUES (?,?,?)", 
    [req.query.name, req.query.location, req.query.alignment],
    function(err)
      {
       
        if(err)
        {
          
        
          next(err);
          return;
        }
      });
   res.status(200).send(null);
});

app.get('/insertLoc', function(req,res,next){
  
   mysql.pool.query("INSERT INTO hxh_location(`name`) VALUES (?)", 
    [req.query.name],
    function(err)
      {
       
        if(err)
        {
          
        
          next(err);
          return;
        }
      });
   res.status(200).send(null);
});

app.get('/insertAura', function(req,res,next){
  
   mysql.pool.query("INSERT INTO hxh_aura_type(`aura_name`) VALUES (?)", 
    [req.query.name],
    function(err)
      {
       
        if(err)
        {
          
        
          next(err);
          return;
        }
      });
   res.status(200).send(null);
});

app.get('/deleteChar', function(req,res,next){
  
   mysql.pool.query("DELETE FROM hxh_character WHERE character_id=?", [req.query.id],
    function(err)
      {
        
        if(err)
        {
         
       
          next(err);
          return;
        }
      });
   res.status(200).send(null);
});


app.get('/deleteCharFF', function(req,res,next){
  
   mysql.pool.query("DELETE FROM hxh_character_relationships WHERE character_id1=? AND character_id2=?", [req.query.id1,req.query.id2],
    function(err)
      {
        
        if(err)
        {
         
       
          next(err);
          return;
        }
      });

         mysql.pool.query("DELETE FROM hxh_character_relationships WHERE character_id2=? AND character_id1=?", [req.query.id1,req.query.id2],
    function(err)
      {
        
        if(err)
        {
         
       
          next(err);
          return;
        }
      });
   res.status(200).send(null);
});

app.get('/deleteOrg', function(req,res,next){

   mysql.pool.query("DELETE FROM hxh_organizations WHERE OrgId=?", [req.query.id],
    function(err)
      {
        
        if(err)
        {
         
       
          next(err);
          return;
        }
      });
   res.status(200).send(null);
});

app.get('/deleteLoc', function(req,res,next){
 
   mysql.pool.query("DELETE FROM hxh_location WHERE LocID=?", [req.query.id],
    function(err)
      {
        
        if(err)
        {
         
       
          next(err);
          return;
        }
      });
   res.status(200).send(null);
});

app.get('/deleteCharOrg', function(req,res,next){
 
   mysql.pool.query("DELETE FROM hxh_CharOrg WHERE character_id=? AND OrgID=?", [req.query.id2,req.query.id1],
    function(err)
      {
        
        if(err)
        {
         
       
          next(err);
          return;
        }
      });
   res.status(200).send(null);
});

app.get('/deleteCharAura', function(req,res,next){
 
   mysql.pool.query("DELETE FROM hxh_CharAura WHERE character_id=? AND aura_id=?", [req.query.id2,req.query.id1],
    function(err)
      {
        
        if(err)
        {
         
       
          next(err);
          return;
        }
      });
   res.status(200).send(null);
});

app.get('/deleteAura', function(req,res,next){
 // console.log("boyyy");
   mysql.pool.query("DELETE FROM hxh_aura_type WHERE aura_id=?", [req.query.id],
    function(err)
      {
        
        if(err)
        {
         
       
          next(err);
          return;
        }
      });
   res.status(200).send(null);
});
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
