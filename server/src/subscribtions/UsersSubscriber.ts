import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  InsertEvent,
  AfterRemove,
} from "typeorm";
import { Users } from "../entity/Users";
@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<any> {
  listenTo(): any {
    return Users;
  }
  // beforeInsert(event: InsertEvent<Users>) {
  //   console.log(`BEFORE POST INSERTED: `, event.entity);
  // }
  // afterLoad(entity: any) {
  //   console.log(`AFTER ENTITY LOADED: `, entity);
  // }
  // @AfterRemove()
  // afterremoving() {
  //   console.log("asdfasdf");
  // }
  // afterUpdate(event: UpdateEvent<Users>): Promise<any> | void {
  //   const priceGotUpdated = event.updatedColumns.find(
  //     (value) => value.propertyName,
  //     Users.prototype.name
  //   );

  //   if (priceGotUpdated) {
  //     if (String(event.databaseEntity.name) !== event.entity.name) {
  //       console.log(
  //         `name changed from
  //               ${event.databaseEntity.name} to
  //               ${event.entity.name}`,
  //         "User name  Updated"
  //       );
  //     }
  //   }
  // }
}
