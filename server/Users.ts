import {EventSubscriber, EntitySubscriberInterface} from "typeorm";

@EventSubscriber()
export class Users implements EntitySubscriberInterface<any> {

}
