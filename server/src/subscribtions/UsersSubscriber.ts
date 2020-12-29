import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
} from "typeorm";
import {Users} from "../entity/Users"
@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<any> {
  listenTo(): any {
    return Users;
  }

  afterUpdate(event: UpdateEvent<Users>): Promise<any> | void {
    const priceGotUpdated = event.updatedColumns.find(
      (value) => value.propertyName,
      Users.prototype.name
    );
    if (priceGotUpdated) {
      if (Number(event.databaseEntity.id) !== event.entity.id) {
        console.log(
          `id changed from 
                ${event.databaseEntity.id} to 
                ${event.entity.id}`,
          "User Id  Updated"
        );
      }
    }
  
}
