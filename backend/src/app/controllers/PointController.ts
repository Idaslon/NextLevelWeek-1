import { Response, Request } from "express";
import knex from "../../database/connection";

class PointController {
  async index(req: Request, res: Response) {
    const {city, uf, items} = req.query;

    const parsedItems = String(items).split(',').map(item => Number(item.trim()))

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')

    return res.json(points)
  }
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first()

    if (!point) {
      return res.status(400).json({error: 'Point not found'})
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title')

    return res.json({point, items})
  }

  async create(req: Request, res: Response) {
    const {items, ...pointData} = req.body;

    const dataToInsert = {
      ...pointData,
      image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
    }
    const trx = await knex.transaction();

    const insertedIds = await trx('points').insert({...dataToInsert});

    const point_id = insertedIds[0]

    const pointItems = items.map((item_id: number) => ({
      item_id,
      point_id,
    }))
    console.log(pointItems);

    await trx('point_items').insert(pointItems)

    await trx.commit()

    return res.json({
      ...dataToInsert,
      id: point_id
    })
  }

}

export default new PointController()
