CREATE TRIGGER Email_Validation 
    BEFORE INSERT ON User FOR EACH ROW

    BEGIN 
        SET @Duplicate_flag = 0;

        IF EXISTS(
            SELECT Email
            FROM User
            WHERE Email = new.Email
         ) 
            THEN
            SET @Duplicate_flag = 1;
        END IF;

        IF @Duplicate_flag = 1
            THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email address already exists!'

        ELSE IF @Duplicate_flag = 0 
            THEN    
            SET new.Email = new.Email 
        END IF;

    END;

CREATE PROCEDURE Channel_Popularity_Calculator(IN YoutubeCategory VARCHAR(30))
    BEGIN  
        DECLARE Video_ChannelId VARCHAR(30);
        DECLARE Video_Popularity DOUBLE;
        Declare Channel_Title VARCHAR(255);
        DECLARE Current_Popularity_Level INT; 
        DECLARE exit_loop BOOLEAN DEFAULT FALSE;

        DECLARE channelCurr CURSOR FOR (
            SELECT c.ChannelId, c.Title, SUM((vs.Likes - vs.Dislikes) + vs.ViewCount + vs.CommentCount) as popularity_metric
            FROM Channel c JOIN Video v USING (ChannelId) JOIN VideoStats vs USING(VideoId) JOIN Categories ca USING (CategoryId)
            WHERE ca.Category = YoutubeCategory 
            GROUP BY c.ChannelId; 
        )
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE;

        DROP TABLE IF EXISTS Channel_Popularity_Calc;

        CREATE TABLE Channel_Popularity_Calc (
            ChannelId VARCHAR(30), 
            Channel_Title VARCHAR(255),
            SCORE DOUBLE,
            Popularity_Level INT
        );

        OPEN channelCurr;

        REPEAT
            FETCH channelCurr INTO Video_ChannelId, Channel_Title, Video_Popularity;

            IF Video_Popularity > 0 AND Video_Popularity < 1000000 THEN   
                SET Current_Popularity_Level = 1; 
            ELSE IF Video_Popularity >= 1000000 AND Video_Popularity < 3000000 THEN
                SET Current_Popularity_Level = 2; 
            ELSE    
                SET Current_Popularity_level = 3; 
            END IF;

            INSERT IGNORE INTO Channel_Popularity_Calc VALUES (Video_ChannelId, Channel_Title, Video_Popularity, Current_Popularity_Level);
            UNTIL exit_loop
        END REPEAT;

            SELECT Channel_Title, Score, Popularity_Level FROM Channel_Popularity_Calc
            ORDER BY ChannelId; 
    END;
            