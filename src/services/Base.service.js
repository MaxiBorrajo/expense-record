class BaseService {
    constructor(repository) {
      this.repository = repository;
    }
  
    async create(object) {
      try {
        const createdObject = await this.repository.create(object);
  
        return createdObject;
      } catch (error) {
        throw error;
      }
    }
  
    async getAll(filter) {
      try {
        const foundObjects = await this.repository.getAll(filter);
  
        return foundObjects;
      } catch (error) {
        throw error;
      }
    }
  
    async getById(id) {
      try {
        const foundObject = await this.repository.getById(id);
  
        return foundObject;
      } catch (error) {
        throw error;
      }
    }
  
    async getByFilter(filter) {
      try {
        const foundObject = await this.repository.getByFilter(filter);
  
        return foundObject;
      } catch (error) {
        throw error;
      }
    }
  
    async updateById(id, object) {
      try {
        const updatedObject = await this.repository.updateById(id, object);
  
        return updatedObject;
      } catch (error) {
        throw error;
      }
    }
  
    async updateByFilter(object, filter) {
      try {
        const updatedObject = await this.repository.updateByFilter(filter, object);
  
        return updatedObject;
      } catch (error) {
        throw error;
      }
    }
  
    async deleteById(id) {
      try {
        const deletedObject = await this.repository.deleteById(id)
        return deletedObject;
      } catch (error) {
        throw error;
      }
    }
  
    async deleteByFilter(filter) {
      try {
        const deletedObject = await this.repository.deleteByFilter(filter);
  
        return deletedObject;
      } catch (error) {
        throw error;
      }
    }
  }
  
  export default BaseService;
  