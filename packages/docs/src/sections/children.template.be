<h1>{`Children`}</h1>
<p class="lede">{`A parent does not render a child as a real host element. It plants a comment, constructs the child instance, copies $props onto @Input fields, and hangs the child's DOM after that comment. Props go down. Callbacks go up. There is no slot, no shared store, and no wrapper div.`}</p>

<h2>{`@Input()`}</h2>
<p>{`A field decorator on the child. The parent writes $label={name}. View evaluates that expression with the parent as this, then assigns the result onto the child. The child field is what the child's template reads.`}</p>
<CodeViewer $tabs={inputTabs} />
<p>{`@Input is @State plus an identity check. A parent re-applies every prop on every parent tick -- not only when that prop changed -- so the setter returns early when the incoming value === the current one. That is why a parent can refresh its own interpolations without every child ticking.`}</p>
<pre>{inputSetterSample}</pre>
<ul>
  <li>{`A new primitive ($label={name} after name becomes Bo) writes, and the child Map runs.`}</li>
  <li>{`The same primitive, or the same object reference, is skipped.`}</li>
  <li>{`Mutating a nested field of an object passed as $user={user} will not refresh the child -- applyProps writes the same proxy. Pass a primitive, or reassign the object, if the child must see the change.`}</li>
</ul>
<p>{`Type in the parent. The badge is a child instance. Its {label} updates only because applyProps wrote a new string onto @Input() label.`}</p>
<div class="demo-box">
  <span class="demo-label">{`live output -- parent $label into a child`}</span>
  <div class="demo-row">
    <input class="demo-input" type="text" value={name} @input={setName} />
    <DemoNameBadge $label={name} />
  </div>
  <p class="demo-message">{`parent name is `}{name}</p>
</div>

<h2>{`How the child renders and is stored`}</h2>
<p>{`The parent template has a tag whose name is in ComponentRegistry. View does not createElement that tag. buildComponent runs in the parent's View:`}</p>
<ol>
  <li>{`Create <!--component:Badge-->. That comment is what the parent tree stores.`}</li>
  <li>{`new Badge() -- the child's @Component wrapper constructs the child's own View and calls init. The child's interpolations are already on the child's Map.`}</li>
  <li>{`applyProps copies $props and @handlers onto the instance. $label={name} becomes child.label = 'Ada'.`}</li>
  <li>{`anchor.nodeChild = child.view.root. Those are the child's real nodes -- here, one span.`}</li>
  <li>{`A microtask inserts those nodes after the comment, once the comment has a parentNode.`}</li>
  <li>{`The parent Map stores one updater on the comment: re-run applyProps. It never walks the child's interpolations.`}</li>
</ol>
<CodeViewer $tabs={storageTabs} />
<p>{`Two Maps, two ticks. Parent writes go through parent.reactiveElements. The child ticks only if applyProps assigned a new @Input value. A child write never notifies the parent.`}</p>

<h2>{`The component comment`}</h2>
<p>{`<!--component:Badge--> is the hole. View cannot return the child's span as the node that sits in the parent -- that span belongs to the child, and a child may stamp several siblings. A wrapper element would add a box and a tag, and would break CSS such as ul > li, flex, or tables. A Comment is a stable slot with no layout.`}</p>
<p>{`In DevTools you see the comment, then the child's nodes as following siblings. The framework sees nodeChild -- the ownership list hung on the comment as a plain JS property.`}</p>
<ul>
@for(job : commentJobs){
  <li><strong>{job.title}</strong>{` -- `}{job.body}</li>
}
</ul>
<p>{`@if and @for use the same idea: the parent sees a Comment, the body lives on nodeChild, the Map key is the comment because the body nodes come and go.`}</p>

<h2>{`Callbacks -- child to parent`}</h2>
<p>{`@onPing={ping} on a component tag is not addEventListener. There is no host element. It is the same applyProps path as a $prop: the parent function is assigned onto a plain field on the child. The child calls this.onPing() itself. That mutates parent state, the parent ticks, applyProps writes $label again.`}</p>
<CodeViewer $tabs={pingTabs} />
<p>{`onPing is a plain field, not @Input -- a function reference is usually stable, and you do not need the child to tick when the callback is re-applied. Click the badge. The child calls up; the parent appends !; the new string comes back down as $label.`}</p>
<div class="demo-box">
  <span class="demo-label">{`live output -- click the child, parent state changes`}</span>
  <div class="demo-row">
    <DemoPingBadge $label={pingName} @onPing={ping} />
  </div>
  <p class="demo-message">{`parent name is `}{pingName}</p>
</div>

<h2>{`A list of children`}</h2>
<p>{`Nesting is usually a parent @for that stamps one child tag per item. Each DemoChip is its own instance, with its own $label and $count, and an @onBump callback back to this page. Click a chip -- only that row's count changes.`}</p>
<pre>{listSample}</pre>
<div class="demo-box">
  <span class="demo-label">{`live output -- click a chip`}</span>
  <div class="demo-chips">
  @for(chip : chips; key = trackChipById){
    <DemoChip $label={chip.label} $count={chip.count} @onBump={() => bumpChip(chip.id)} />
  }
  </div>
</div>

<div class="callout">
  <span class="callout-title">{`What does not exist yet`}</span>
  <ul>
    <li>{`No content projection / slots -- text between opening and closing component tags is parsed and ignored.`}</li>
    <li>{`No destroyed() call when the comment is unmounted.`}</li>
    <li>{`Plain unprefixed attributes on a component tag do nothing -- there is no host element to set them on.`}</li>
  </ul>
</div>
