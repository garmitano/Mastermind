import { HumanPlayerView, RandomPlayerView } from "./PlayerView.js";
import { GameMode } from "../Utils/GameMode.js";
import { Message } from "./Message.js";
import { console } from "../Utils/console.js";

class TurnView {
   #gameMode;
   #activePlayerView;
   #turn;

   constructor(turn) {
      this.#turn = turn;
      this.#gameMode = new GameMode();
   }

   readPlayers() {
      let numHumanPlayers = this.#gameMode.read();
      this.#turn.reset(numHumanPlayers);
      this.#turn.getSecretPlayer().acceptSecret(this);
      this.#turn.setSecretCombination(this.#activePlayerView.readCombination());
      console.writeln(
         `visito al elegido como secretPlayer y le digo que lea la combinacion secreta ${this.#activePlayerView.readCombination()}`
      );
   }

   interact() {
      console.writeln("comienzo a interactuar con el propousal");
      this.#turn.getActivePlayer().accept(this);
      this.#turn.play(this.#activePlayerView.readCombination());
      console.writeln(
         `visito al player ${this.#activePlayerView} y le pedi la combination`
      );
   }

   visitHumanPlayer(player) {
      console.writeln("eleji jugar con el propousal human");
      console.writeln(Message.PROPOUSAL_PLAYER);
      this.#activePlayerView = new HumanPlayerView(Message.PROPOUSAL_PLAYER);
   }
   visitRandomPlayer(player) {
      console.writeln("eleji jugar con el propousal random");
      this.#activePlayerView = new RandomPlayerView(Message.PROPOUSAL_PLAYER);
   }
   visitHumanSecretPlayer(player) {
      console.writeln("eleji jugar con el secret human");
      this.#activePlayerView = new HumanPlayerView(Message.SECRET_PLAYER);
   }
   visitRandomSecretPlayer(player) {
      console.writeln("eleji jugar con el secret random");
      this.#activePlayerView = new RandomPlayerView(Message.SECRET_PLAYER);
   }
}

export { TurnView };
