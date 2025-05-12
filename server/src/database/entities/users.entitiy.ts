import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class ChatUsers {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({})
    username : string;

    @Column({unique : true})
    email : string;

    @Column({  })
    phone : string;

    @Column({ })
    password : string;

    @Column({ })
    created_at : Date;

}