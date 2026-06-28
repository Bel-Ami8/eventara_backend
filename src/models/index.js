const sequelize = require('../config/database');

const AuditLog = require('./auditLog.model')(sequelize);//équivaut à const fonctionAutdit = require('../auditLog.model');const AuditLog = fonctionAudit(sequelize)
const Categories = require('./category.model')(sequelize);
const DeviceTokens = require('./deviceToken.model')(sequelize);
const EventController = require('./eventController.model')(sequelize);
const Event = require('./events.model')(sequelize);
const Order = require('./order.model')(sequelize);
const Payment = require('./payment.model')(sequelize);
const RefreshToken = require('./refreshToken.model')(sequelize);
const Ticket = require('./ticket.model')(sequelize);
const TicketTypes = require('./ticketTypes.model')(sequelize);
const User = require('./users.model')(sequelize);

//Relations d'associations entre les différentes tables

//user-event
User.hasMany(Event, {foreignKey: 'organizer_id',as: 'eventOrganized'});
Event.belongTo(User, { foreignKey: 'organizer_id',as: 'organizer'});
//User-Order
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders'});
Order.belongTo(User,{foreignKey: 'user_id', as: 'buyer'});
//User-AuditLog
User.hasMany(AuditLog, { foreignKey: 'user_id', as: 'logs'});
AuditLog.belongTo(User,{foreignKey: 'user_id', as: 'auditor'});
//User-DeviceTokens
User.hasMany(DeviceTokens, { foreignKey: 'user_id', as: 'devices'});
DeviceTokens.belongTo(User,{foreignKey: 'user_id', as: 'proprio'});
//User-EventController
//un  utilisateur peut  être  controlleur sur plusieurs évènements
User.hasMany(EventController, { foreignKey: 'user_id', as: 'controllerAssignments'});
EventController.belongTo(User,{foreignKey: 'user_id', as: 'controller'});
//un controlleur est assigné par une seule personne
EventController.belongTo(User,{foreignKey: 'assigned_by', as: 'assigner'});

//category-Event
Categories.hasMany(Event, { foreignKey: 'category_id', as: 'evenements'});
Event.belongTo(Categories,{foreignKey: 'category_id', as: 'categorized'});

//Event-EventController
Event.hasMany(EventController, { foreignKey: 'event_id', as: 'eventControllers'});
EventController.belongTo(Event,{foreignKey: 'event_id', as: 'evenemen'});
//Event-TiketTypes
Event.hasMany(TicketTypes, { foreignKey: 'event_id', as: 'types'});
TicketTypes.belongTo(Event,{foreignKey: 'event_id', as: 'even'});

//TicketType-Ticket
TicketTypes.hasMany(Ticket, { foreignKey: 'ticket_type_id', as: 'tickets'});
Ticket.belongTo(TicketTypes,{foreignKey: 'ticket_type_id', as: 'typed'});
//TicketTypes-Order
TicketTypes.hasMany(Order, { foreignKey: 'ticket_type_id', as: 'orders'});
Order.belongTo(TicketTypes,{foreignKey: 'tyket_type_id', as: 'ticketTypes'});

//Order-Payment
Order.hasMany(Payment, { foreignKey: 'order_id', as: 'payments'});
Payment.belongTo(Order,{foreignKey: 'order_id', as: 'orders'});
//Order-ticket
Order.hasMany(Ticket, { foreignKey: 'order_id', as: 'tickets'});
Ticket.belongTo(Order,{foreignKey: 'order_id', as: 'orders'});

module.exports = { sequelize,AuditLog, Categories, DeviceTokens, EventController, Event, Order, Payment,
    RefreshToken, Ticket, TicketTypes, User
}