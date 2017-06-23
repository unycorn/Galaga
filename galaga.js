 window.onload = function()
 {
     canvas = document.getElementById("canvas");
     ctx = canvas.getContext("2d");

     player_img = new Image();
     player_img.src = "img/player.png";

     enemy_img = new Image();
     enemy_img.src = "img/enemy.png";

     window.setInterval(game, 1000 / 60);
     window.addEventListener('keydown', keydown);
     window.addEventListener('keyup', keyup);
 }

 width = canvas.width;
 height = canvas.height;


 var left_key = false;
 var up_key = false;
 var right_key = false;
 var down_key = false;

 var player_x = width / 2;
 var player_width = width / 10;
 var player_height = height / 10;

 var pi = Math.PI;
 var enemy_velocity = 10;
 var enemy_x = width / 3;
 var enemy_y = height / 3;
 var enemy_x_distance;
 var enemy_y_distance;
 var enemy_angle = 0;

 var radius = 10;

 var enemies = [];
 var enemy_count = 0;

 var ticks = 0;

 function game()
 {
     if (left_key)
     {
         player_x -= width / 100;
     }
     if (right_key)
     {
         player_x += width / 100;
     }

     if (player_x > width - (player_width / 2))
     {
         player_x = -player_width / 2
     }
     if (player_x < -player_width / 2)
     {
         player_x = width - (player_width / 2)
     }

     ctx.fillStyle = "black";
     ctx.fillRect(0, 0, width, height);

     ctx.fillStyle = "red";
     ctx.drawImage(player_img, player_x, height - (1.5 * player_height), player_width, player_height);
     if (player_x < 0)
     {
         ctx.drawImage(player_img, width + player_x, height - (1.5 * player_height), player_width, player_height);
     }

     if (player_x > width - player_width)
     {
         ctx.drawImage(player_img, -width + player_x, height - (1.5 * player_height), player_width, player_height);
     }

     for (var i = 0; i < enemy_count; i++)
     {
         switch (enemies[i].stage)
         {
             case 0:
             case 1:
                 enemies[i].x += enemies[i].ax / (enemies[i].time * 60);
                 enemies[i].y += enemies[i].ay / (enemies[i].time * 60);
                 break;
             case 2:
                 enemies[i].x += Math.cos(enemies[i].angle) * radius;
                 enemies[i].y += Math.sin(enemies[i].angle) * 2 * radius;
                 enemies[i].angle += 0.1;
                 break;
             default:
                 break;
         }

         if (this.ticks % 60 == 0 && enemies[i].stage < 2)
         {
             enemies[i].tx = Math.floor(Math.random() * (width - 1));
             enemies[i].ty = Math.floor(Math.random() * (height / 10));
             enemies[i].stage += 1;
         }

         ctx.fillStyle = "green";
         ctx.drawImage(enemy_img, enemies[i].x, enemies[i].y, player_width, player_height);
     }


     if (ticks % 300 == 0)
     {
         enemies[enemy_count] = new enemy(Math.floor(Math.random() * (width + 1)), Math.floor(Math.random() * (player_height)), width / 2, width / 2, 2);
         enemy_count += 1;
     }

     ticks += 1;
 }

 function enemy(x, y, tx, ty, time)
 {
     this.x = x;
     this.y = y;
     this.tx = tx;
     this.ty = ty;
     this.ax = tx - x;
     this.ay = ty - y;
     this.time = time;
     this.stage = 0;
     this.angle = 0;
     this.ticks = 0;
 }

 function keydown(e)
 {
     switch (e.keyCode)
     {
         case 37:
             left_key = true;
             break;
         case 38:
             up_key = true;
             break;
         case 39:
             right_key = true;
             break;
         case 40:
             down_key = true;
             break;
     }
 }

 function keyup(e)
 {
     switch (e.keyCode)
     {
         case 37:
             left_key = false;
             break;
         case 38:
             up_key = false;
             break;
         case 39:
             right_key = false;
             break;
         case 40:
             down_key = false;
             break;
     }
 }
