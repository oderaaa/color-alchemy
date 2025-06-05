import { GameSlice } from "./slices/game/types";
import { UISlice } from "./slices/ui/types";
import { AuthSlice } from "./slices/auth/types";

export interface StoreState {
  game: GameSlice;
  ui: UISlice;
  auth: AuthSlice;
}
