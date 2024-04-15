    import { addRxPlugin, createRxDatabase } from 'rxdb';
    import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
    import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { gerarNumeroAleatorio } from '../utils/gerarNumeroAleatorio';


    addRxPlugin(RxDBDevModePlugin);

    export const  createDatabase = async () => {
        const dbjogos = await createRxDatabase({
            name: 'dbjogos',
            storage: getRxStorageDexie(),
            ignoreDuplicate: true,
            
        });


        const tableParams = {
            version: 0,
            primaryKey: 'id',
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    maxLength: 1000,
                },
                name: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                },
                isFavorite: {
                    type: 'boolean',
                    default: false
                }
            },
            required: ['id','name', 'password','isFavorite']
        };

        await dbjogos.addCollections({
            games: {
                schema: tableParams
            }
        });

        // await dbjogos.games.remove();

    

        const id = gerarNumeroAleatorio(0,5000)

        await dbjogos.games.insert({id , name:'admin' ,password:'admin',isFavorite:false});
        
        const games = await dbjogos.games.find().exec();
        games.forEach(games => {
            console.log('ID:', games.id, 'Nome:', games.name, 'Senha:', games.password , 'favorite' , games.isFavorite);
        });

        return dbjogos; 
    };




