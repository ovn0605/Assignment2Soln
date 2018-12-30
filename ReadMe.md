# Card Matching Game
### Installation
The game is available at  https://ovn0605.github.io/Assignment2Soln/
By simply typing the URL address in your web browser you will get the game loaded.
You should, however, ensure that Javascript is enabled in your browser.

### Playing The Game
The game consists of 16 cards, with 8 pairs of pictures.
When the game loads, the pictures are not visible (the cards face downwards).
The game starts when the user clicks on any of the cards.
At the first click, the card is turned up, i.e the picture becomes visible.
On the second click, if the picture is the same as the first one, both cards stay up.
If the pictures are different, both cards are turned face down. 
The game ends when the user has been able to match all the pairs.

#### Star Rating and Timer 
When the game starts, the page shows a 3* rating, starts a timer and starts counting the number of moves.
If the user needs too many moves, the star rating will start reducing to 2, then 1.
The maximum number of moves for the different star rating has currently been kept at 32 and 38 respectively for  3 and 2.
When the user finishes the game (has matched all pairs), the timer stops. A popup window will inform the user that the game is over and display the time taken in minutes and seconds.
The popup will ask the user whether he/she wants to play again. If the user responds by Yes, the game is reinitialized. Otherwise, all the pictures stay up.

#### The Reset Button
A Reset button allows the user to rstart the game at any time. For example, after a few moves, if the user wants to restart, he/she can simply click on the Reset button. The timer, move count and star rating will be re-initialized and the cards reshuffled.

