import Service from '../service';

class modelService extends Service {
    addModel(params) {
        return this.post('/rdp-model/modelInfo/add', params);
    }

    editModel(params) {
        return this.put('/rdp-model/modelInfo/update', params);
    }

    queryModelInfo(params) {
        return this.get('/rdp-model/modelInfo/query', params);
    }

    queryModelTree(params) {
        return this.get('/rdp-model/modelTree/query', params);
    }

    deleteModel(params) {
        this.delete('/rdp-model/modelInfo/deleteById', params);
    }
}

export default modelService;