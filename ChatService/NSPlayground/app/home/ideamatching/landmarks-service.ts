import { Injectable } from "@angular/core";
import { Landmark } from "./landmark.model";
import { LANDMARKS } from "./mock-landmarks";

@Injectable()
export class LandmarksService {
    private _selectedId = -1;

    getLandmarks(): Landmark[] {
        return LANDMARKS;
    }

    getLandmark(id: number): Landmark {
        return LANDMARKS.filter(landmark => landmark.id === id)[0];
    }

    setSelectedId(id: number) {
        if (id < LANDMARKS.length) {
            this._selectedId = id;
        }
    }

    getSelected(): Landmark {
        return this._selectedId < 0 ? null : this.getLandmark(this._selectedId);
    }
}