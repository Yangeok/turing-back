exports.allLists = async ctx => {
  ctx.body = 'allLists';
};

exports.list = async ctx => {
  let id = ctx.params.id;
  ctx.body = 'list';
};

exports.create = async ctx => {
  ctx.body = 'create';
};

exports.update = async ctx => {
  let id = ctx.params.id;
  ctx.body = 'update';
};

exports.delete = async ctx => {
  let id = ctx.params.id;
  ctx.body = 'delete';
};
