const mapModel = require('../map/map.model');
const jwt = require("jsonwebtoken");
let Token = require("../token/token.model");
const { throwError500, throwError404 } = require('../error-handler/errorHandler');

class MapController {
   
    /*
    @param json request
    @param json respond
    */

    // method: GET, uri: /map

    getAllMap(request, respond) {
        mapModel.find((error, map) => {
                if (error) {
                   throwError500();
                }

                respond.status(200).json({
                    success: true,
                    message: 'Done!',
                    mapModel: map
                });
            }
        );
    }
    
    /*
    @param json request
    @param json respond
    */

    // method: POST, uri: /map
    async addNewMap(request, respond) {
        try {
              const newMap = new mapModel(request.body);
              await newMap.save();
              respond.status(200).json({ success: true, message: 'New map added successfully!', mapModel: newMap});
            } 
        catch (error) {
            throwError500(respond)
        }
    }

    /*
    @param json request
    @param json respond
    */

    // method: PUT, uri: /map
   changeMap(request, respond){
       mapModel.findOneAndUpdate({_id: request.body._id}, request.body, {new: true}, (err, mapDocument) => {
           if(err) {
               throwError500(respond)
               return;
           }
           
           if (mapDocument !== null) {
               respond.status(200).json({
                       success: true,
                       message: 'Done!',
                   })
               return;
           }

          throwError404(respond)
       })
   }

    // method: DELETE, uri: /map
   deleteMap(request, respond){
       mapModel.findOneAndDelete({_id: request.body._id}, {new: true}, (err, mapDocument) => {
           if(err) {
               throwError500(respond)
               return;
           }
           
           if (mapDocument !== null) {
               respond.status(200).json({
                       success: true,
                       message: 'Delete done!',
                   })
               return;
           }
          throwError404(request)
       })
   }
   authenToken(req, res, next) {
    const user_token = req.headers["authorization"];
    Token.find((err, tokens) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
        });
      } else {
        for (var i = 0; i < tokens.length; i++) {
          if (tokens[i].token === user_token) {
            if (!user_token) res.sendStatus(401);

            jwt.verify(
              user_token,
              process.env.ACCESS_TOKEN_SECRET,
              (err, data) => {
                if (err) {
                  res.sendStatus(403);
                  return;
                }
                next();
              }
            );
          }
        }
      }
    });
  }

}

module.exports = new MapController();