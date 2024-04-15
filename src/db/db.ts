import { addRxPlugin, createRxDatabase } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { v4 as uuidv4 } from 'uuid';


addRxPlugin(RxDBDevModePlugin);

export const  createDatabase = async () => {
    const dbuser = await createRxDatabase({
        name: 'dbuser',
        storage: getRxStorageDexie(),
        ignoreDuplicate: true
    });

    const tableParams = {
        version: 0,
        primaryKey: 'id',
        type: 'object',
        properties: {
            id: {
                type: 'string',
                auto: true,
                maxLength: 100,
            },
            name: {
                type: 'string'
            },
            password: {
                type: 'string'
            }
        },
        required: ['id','name', 'password']
    };

     await dbuser.addCollections({
        users: {
            schema: tableParams
        }
    });

    //  await dbuser.users.remove();



    const id = uuidv4()

    await dbuser.users.insert({id , name:'admin' ,password:'admin'})
    
    // const users = await dbuser.users.find().exec();
    // users.forEach(user => {
    //     console.log('ID:', user.id, 'Nome:', user.name, 'Senha:', user.password, "image" , user.image);
    // });

    return dbuser; 
};




