type EntityKey = string | number;

class Entity {
  constructor(public id: EntityKey, public name: string) {
  }
}

export default Entity;
