const ApiError = require("../utils/apiError");

class CommonService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async getById(id, populate = "") {
    const query = this.model.findById(id);
    if (populate) query.populate(populate);
    const result = await query;
    if (!result) throw new ApiError(404, "Record not found");
    return result;
  }

  async getAll(query = {}, populate = "") {
    const { page = 1, limit = 10, ...filters } = query;
    const skip = (page - 1) * limit;

    const [result, totalItems] = await Promise.all([
      this.model.find(filters).skip(skip).limit(limit).sort({ createdAt: -1 }).populate(populate),
      this.model.countDocuments(filters),
    ]);

    return {
      result,
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
      },
    };
  }

  async updateById(id, update) {
    const updated = await this.model.findByIdAndUpdate(id, update, { returnDocument: "after", runValidators: true });
    if (!updated) throw new ApiError(404, "Record not found for update");
    return updated;
  }


  async deleteById(id) {
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) throw new ApiError(404, "Record not found for delete");
    return deleted;
  }
}

module.exports = CommonService;
