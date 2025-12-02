import { Types } from 'mongoose';

/**
 * MongoDB Document의 _id를 string id로 변환
 */
export function getDocumentId(doc: any): string {
  if (!doc) return null;

  // _id가 있으면 string으로 변환
  if (doc._id) {
    return doc._id.toString();
  }

  // id가 이미 있으면 그대로 반환
  if (doc.id) {
    return doc.id;
  }

  return null;
}

/**
 * string id를 MongoDB ObjectId로 변환
 */
export function toObjectId(id: string): Types.ObjectId {
  return new Types.ObjectId(id);
}

/**
 * MongoDB Document를 plain object로 변환하면서 _id를 id로 매핑
 */
export function toPlainObject<T = any>(doc: any): T {
  if (!doc) return null;

  // toJSON이 있으면 사용
  if (typeof doc.toJSON === 'function') {
    return doc.toJSON();
  }

  // toObject가 있으면 사용
  if (typeof doc.toObject === 'function') {
    const obj = doc.toObject();
    if (obj._id) {
      obj.id = obj._id.toString();
      delete obj._id;
      delete obj.__v;
    }
    return obj;
  }

  // 일반 객체면 그대로 반환
  return doc;
}
