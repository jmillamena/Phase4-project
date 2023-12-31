"""edit grade table

Revision ID: dfb7cb2c3c5a
Revises: 7534c8711345
Create Date: 2023-10-20 08:32:49.452160

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dfb7cb2c3c5a'
down_revision = '7534c8711345'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('students', schema=None) as batch_op:
        batch_op.create_foreign_key(batch_op.f('fk_students_wand_id_wands'), 'wands', ['wand_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key(batch_op.f('fk_students_pet_id_pets'), 'pets', ['pet_id'], ['id'], ondelete='CASCADE')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('students', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_students_pet_id_pets'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_students_wand_id_wands'), type_='foreignkey')

    # ### end Alembic commands ###
