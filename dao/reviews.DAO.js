import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

// let reviews: mongodb.Collection
let reviews

export default class ReviewsDAO {
  static async injectDB(connection) {
    if (reviews) {
      return
    }
    try {
      reviews = await connection.db('movie-reviews').collection('movie-reviews')
      // console.log(reviews)
      // Collection {
      //   s: {
      //     db: Db { s: [Object] },
      //     options: {
      //       raw: false,
      //       promoteLongs: true,
      //       promoteValues: true,
      //       promoteBuffers: false,
      //       ignoreUndefined: false,
      //       bsonRegExp: false,
      //       serializeFunctions: false,
      //       fieldsAsRaw: {},
      //       enableUtf8Validation: true,
      //       writeConcern: [WriteConcern],
      //       readPreference: [ReadPreference]
      //     },
      //     namespace: MongoDBNamespace {
      //       db: 'movie-reviews',
      //       collection: 'movie-reviews'
      //     },
      //     pkFactory: { createPk: [Function: createPk] },
      //     readPreference: ReadPreference {
      //       mode: 'primary',
      //       tags: undefined,
      //       hedge: undefined,
      //       maxStalenessSeconds: undefined,
      //       minWireVersion: undefined
      //     },
      //     bsonOptions: {
      //       raw: false,
      //       promoteLongs: true,
      //       promoteValues: true,
      //       promoteBuffers: false,
      //       ignoreUndefined: false,
      //       bsonRegExp: false,
      //       serializeFunctions: false,
      //       fieldsAsRaw: {},
      //       enableUtf8Validation: true
      //     },
      //     readConcern: undefined,
      //     writeConcern: WriteConcern { w: 'majority', wtimeout: 2500 }
      //   }
      // }
    } catch (error) {
      console.log('Unable to establish connection handles in reviewsDAO:', error)
    }
  }

  static async postReview(movieId, user, review) {
    try {
      const reviewDocument = {
        movieId: movieId,
        user: user,
        review: review,
      }
      console.log('adding review')
      return await reviews.insertOne(reviewDocument)
    } catch (error) {
      console.log('Unable to post review', error)
      return { error, status: 'error', message: 'Unable to post review' }
    }
  }

  static async deleteReview(reviewId) {
    console.log('dao reviewid', reviewId)
    try {
      const deleteReviewResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
      })
      console.log('removing review, deleteReviewResponse:', deleteReviewResponse)
      return deleteReviewResponse
    } catch (error) {
      console.log('Unable to delete review', error)
      return { error, status: 'error', message: 'Unable to delete review' }
    }
  }

  static async updateReview(reviewId, review, user) {
    try {
      const reviewUpdateResponse = await reviews.updateOne(
        { _id: ObjectId(reviewId) },
        { $set: { user: user, review: review } }
      )
      console.log(
        'updating review',
        'reviewUpdateResponse',
        reviewUpdateResponse,
        user,
        review,
        reviewId
      )
      return reviewUpdateResponse
    } catch (error) {
      console.log('Unable to update review', error)
      return { error, status: 'error', message: 'Unable to update review' }
    }
  }

  static async getReview(reviewId) {
    try {
      return await reviews.findOne({ _id: new ObjectId(reviewId) })
    } catch (error) {
      console.log('Unable to get review:', error)
      return { error, status: 'error', message: 'Unable to get review' }
    }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      const cursor = await reviews.find({
        movieId: parseInt(movieId),
      })
      return cursor.toArray()
    } catch (error) {
      console.log('Unable to get review', error)
      return { error, status: 'error', message: 'Unable to get reviews by movie id' }
    }
  }
}
